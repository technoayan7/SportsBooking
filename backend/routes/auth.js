// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Load environment variables
const dotenv = require('dotenv');
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

// Register Route
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // Basic validation
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists.' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = new User({
            username,
            password: hashedPassword,
        });

        await user.save();

        // Create JWT
        const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN,
        });

        res.status(201).json({
            token,
            user: {
                id: user._id,
                username: user.username,
            },
        });
    } catch (err) {
        console.error('Registration Error:', err);
        res.status(500).json({ message: 'Server error during registration.' });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Basic validation
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    try {
        // Find user
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        // Create JWT
        const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN,
        });

        res.status(200).json({
            token,
            user: {
                id: user._id,
                username: user.username,
            },
        });
    } catch (err) {
        console.error('Login Error:', err);
        res.status(500).json({ message: 'Server error during login.' });
    }
});

module.exports = router;
