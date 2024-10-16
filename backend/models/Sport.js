// backend/models/Sport.js
const mongoose = require('mongoose');

const SportSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    courts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Court',
    }],
});

module.exports = mongoose.model('Sport', SportSchema);
