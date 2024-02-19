const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const disasterSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    images: [{
        type: String, // Assuming the image URLs will be stored as strings
        required: true
    }],
    status: {
        type: String,
        enum: ['pending', 'active', 'resolved'], // Assuming a predefined set of status values
        default: 'pending'
    },
}, {
  timestamps: true,
});

const Disaster = mongoose.model('Disaster', disasterSchema);

module.exports = Disaster;
