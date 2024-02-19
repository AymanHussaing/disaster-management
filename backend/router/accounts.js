const express = require('express')
const router = express.Router()
const Volunteer = require('../models/volunteer');
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET;
require('dotenv').config()

router.post('/register', async (req, res) => {
    try {
        const { username, password, aadharNo, city } = req.body;

        // Check if all required fields are provided
        if (!username || !password || !aadharNo || !city) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if the username or Aadhar number already exists
        const existingVolunteer = await Volunteer.findOne({ $or: [{ username }, { aadharNo }] });
        if (existingVolunteer) {
            return res.status(400).json({ message: "Username or Aadhar number already exists" });
        }

        // Create a new volunteer
        const newVolunteer = new Volunteer({
            username,
            password,
            aadharNo,
            city
        });

        // Save the new volunteer to the database
        await newVolunteer.save();

        const token = jwt.sign({ username: newVolunteer.username }, secret);
        res.status(201).json({ message: "Volunteer signed up successfully", token });
    } catch (error) {
        console.error("Error in volunteer sign-up:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});




router.post('/signin', async (req, res) => {
    try {
        const { username, password } = req.body;

        const volunteer = await Volunteer.findOne({ username });

        if (!volunteer || volunteer.password !== password) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const token = jwt.sign({ username: volunteer.username }, secret);
        res.status(200).json({ message: "Volunteer signed in successfully", token });
    } catch (error) {
        console.error("Error in volunteer sign-in:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router