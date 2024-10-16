// backend/models/Center.js
const mongoose = require('mongoose');

const CenterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    location: {
        type: String,
        required: true,
    },
    sports: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sport',
    }],
});

module.exports = mongoose.model('Center', CenterSchema);
