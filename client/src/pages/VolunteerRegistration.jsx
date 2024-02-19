import React, { useState } from 'react';
import axios from "axios";



const VolunteerRegistration = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    aadharNo: '',
    city: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4010/accounts/register', formData);
      console.log(response.data); 
      setFormData({
        username: '',
        password: '',
        aadharNo: '',
        city: ''
      })
      
    } catch (error) {
      console.error('Error occurred while submitting form:', error);
     
    }
  };
  

  return (
    <div>
      <h2>Volunteer Registration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input 
            type="text" 
            name="username" 
            value={formData.username} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label>Password:</label>
          <input 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label>Aadhar Number:</label>
          <input 
            type="text" 
            name="aadharNo" 
            value={formData.aadharNo} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label>City:</label>
          <input 
            type="text" 
            name="city" 
            value={formData.city} 
            onChange={handleChange} 
            required 
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default VolunteerRegistration;
