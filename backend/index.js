// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

// Routes
const centerRoutes = require('./routes/centers');
const sportRoutes = require('./routes/sports');
const courtRoutes = require('./routes/courts');
const bookingRoutes = require('./routes/bookings');
const authRoutes = require('./routes/auth');

app.use('/api/centers', centerRoutes);
app.use('/api/sports', sportRoutes);
app.use('/api/courts', courtRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/auth', authRoutes); // Added Authentication Routes

app.get('/', (req, res) => {
    res.send('Sports Booking API');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
