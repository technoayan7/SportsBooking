// backend/routes/centers.js
const express = require('express');
const router = express.Router();
const Center = require('../models/Center');


// Middleware to get center by ID
async function getCenter(req, res, next) {
    let center;
    try {
        center = await Center.findById(req.params.id).populate('sports');
        if (!center) {
            return res.status(404).json({ message: 'Center not found' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.center = center;
    next();
}

// Get all centers
router.get('/', async (req, res) => {
    try {
        const centers = await Center.find().populate('sports');
        res.json(centers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single center by ID
router.get('/:id', getCenter, (req, res) => {
    res.json(res.center);
});

// Create a new center
router.post('/', async (req, res) => {
    const center = new Center({
        name: req.body.name,
        location: req.body.location,
    });

    try {
        const newCenter = await center.save();
        res.status(201).json(newCenter);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
