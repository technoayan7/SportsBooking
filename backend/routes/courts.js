// backend/routes/courts.js
const express = require('express');
const router = express.Router();
const Court = require('../models/Court');
const Center = require('../models/Center');
const Sport = require('../models/Sport');

// Get all courts
router.get('/', async (req, res) => {
    try {
        const courts = await Court.find().populate('sport center');
        res.json(courts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new court
router.post('/', async (req, res) => {
    const { name, sportId, centerId } = req.body;

    try {
        const sport = await Sport.findById(sportId);
        const center = await Center.findById(centerId);

        if (!sport || !center) {
            return res.status(400).json({ message: 'Invalid sport or center ID' });
        }

        const court = new Court({
            name,
            sport: sportId,
            center: centerId,
        });

        const newCourt = await court.save();

        // Update sport and center with the new court
        sport.courts.push(newCourt._id);
        await sport.save();

        center.sports.push(sport._id);
        await center.save();

        res.status(201).json(newCourt);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
