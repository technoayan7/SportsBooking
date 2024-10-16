// backend/routes/sports.js
const express = require('express');
const router = express.Router();
const Sport = require('../models/Sport');

// Get all sports
router.get('/', async (req, res) => {
    try {
        const sports = await Sport.find().populate('courts');
        res.json(sports);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new sport
router.post('/', async (req, res) => {
    const sport = new Sport({
        name: req.body.name,
    });

    try {
        const newSport = await sport.save();
        res.status(201).json(newSport);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
