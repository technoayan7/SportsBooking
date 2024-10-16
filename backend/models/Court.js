// backend/models/Court.js
const mongoose = require('mongoose');

const CourtSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    sport: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sport',
        required: true,
    },
    center: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Center',
        required: true,
    },
});

module.exports = mongoose.model('Court', CourtSchema);
