require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const accountsRouter = require('./router/accounts');
const cors = require('cors')
const PORT = process.env.PORT || 3000;
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + file.originalname)
    }
  })
  
const upload = multer({ storage: storage })

const Disaster = require('./models/disaster')



mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())
app.use('/accounts', accountsRouter);

app.post('/post/disaster', upload.array('images'), async (req, res) => {
    const { type, place } = req.body;
    const filePaths = [];
    for (let i = 0; i < req.files.length; i++) {
        filePaths.push(req.files[i].path);
    }
    try {
        const newDisaster = new Disaster({
            type: type,
            place: place,
            images: filePaths,
            status: 'pending' 
        });
        const savedDisaster = await newDisaster.save();

        res.json(savedDisaster);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

