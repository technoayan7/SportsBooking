// backend/routes/bookings.js
const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Center = require('../models/Center');
const Sport = require('../models/Sport');
const Court = require('../models/Court');
const authMiddleware = require('../middleware/authMiddleware');

// View bookings for a specific center, sport, and date
router.get('/', authMiddleware, async (req, res) => {
    const { centerId, sportId, date } = req.query;

    if (!centerId || !sportId || !date) {
        return res.status(400).json({ message: 'centerId, sportId, and date are required' });
    }

    try {
        const bookings = await Booking.find({
            center: centerId,
            sport: sportId,
            date: new Date(date),
        }).populate('court');

        res.json(bookings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new booking
router.post('/', authMiddleware, async (req, res) => {
    const { centerId, sportId, courtId, date, timeSlot, customerName } = req.body;

    if (!centerId || !sportId || !courtId || !date || !timeSlot || !customerName) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check if the court exists and matches the sport and center
        const court = await Court.findById(courtId);
        if (!court) {
            return res.status(400).json({ message: 'Invalid court ID' });
        }
        if (court.sport.toString() !== sportId || court.center.toString() !== centerId) {
            return res.status(400).json({ message: 'Court does not match sport or center' });
        }

        // Create booking
        const booking = new Booking({
            center: centerId,
            sport: sportId,
            court: courtId,
            date: new Date(date),
            timeSlot,
            customerName,
        });

        const newBooking = await booking.save();
        res.status(201).json(newBooking);
    } catch (err) {
        if (err.code === 11000) {
            res.status(400).json({ message: 'This time slot is already booked for the selected court' });
        } else {
            res.status(400).json({ message: err.message });
        }
    }
});

module.exports = router;
