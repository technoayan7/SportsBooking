// backend/seed.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const Center = require('./models/Center');
const Sport = require('./models/Sport');
const Court = require('./models/Court');
const User = require('./models/User');
const Booking = require('./models/Booking');

dotenv.config();

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Connected to MongoDB');

        // Clear existing data
        await Center.deleteMany({});
        await Sport.deleteMany({});
        await Court.deleteMany({});
        await User.deleteMany({});
        await Booking.deleteMany({});

        console.log('Cleared existing data');

        // Create Centers
        const centers = [
            { name: 'Indiranagar', location: 'Bangalore' },
            { name: 'Koramangala', location: 'Bangalore' },
            { name: 'Whitefield', location: 'Bangalore' },
            { name: 'Jayanagar', location: 'Bangalore' },
            { name: 'Malleshwaram', location: 'Bangalore' },
        ];

        const createdCenters = await Center.insertMany(centers);
        console.log('Created Centers');

        // Create Sports
        const sports = [
            { name: 'Badminton' },
            { name: 'Squash' },
            { name: 'Tennis' },
            { name: 'Basketball' },
            { name: 'Volleyball' },
            { name: 'Table Tennis' },
            { name: 'Football' },
            { name: 'Cricket' },
        ];

        const createdSports = await Sport.insertMany(sports);
        console.log('Created Sports');

        // Associate sports with centers
        for (const center of createdCenters) {
            // Randomly assign 3-5 sports to each center
            const shuffledSports = createdSports.sort(() => 0.5 - Math.random());
            const selectedSports = shuffledSports.slice(0, Math.floor(Math.random() * 3) + 3);
            center.sports = selectedSports.map(sport => sport._id);
            await center.save();
        }
        console.log('Associated Sports with Centers');

        // Create Courts for each sport in each center
        const courtPromises = [];
        for (const center of createdCenters) {
            const centerSports = await Sport.find({ _id: { $in: center.sports } });
            for (const sport of centerSports) {
                // Create 2-4 courts per sport per center
                const numCourts = Math.floor(Math.random() * 3) + 2;
                for (let i = 1; i <= numCourts; i++) {
                    courtPromises.push(new Court({
                        name: `${sport.name} Court ${i}`,
                        sport: sport._id,
                        center: center._id,
                    }).save());
                }
            }
        }

        const createdCourts = await Promise.all(courtPromises);
        console.log('Created Courts');

        // Associate courts with sports
        for (const sport of createdSports) {
            const sportCourts = createdCourts.filter(court => court.sport.toString() === sport._id.toString());
            sport.courts = sportCourts.map(court => court._id);
            await sport.save();
        }
        console.log('Associated Courts with Sports');

        // Create Users
        const users = [
            { username: 'admin', password: 'Admin@123' },
            { username: 'john_doe', password: 'JohnDoe@456' },
            { username: 'jane_smith', password: 'JaneSmith@789' },
            { username: 'alice_wonder', password: 'Alice@Wonder123' },
            { username: 'bob_builder', password: 'Bob@Builder456' },
        ];

        const userPromises = users.map(async user => {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(user.password, salt);
            return new User({
                username: user.username,
                password: hashedPassword,
            }).save();
        });

        const createdUsers = await Promise.all(userPromises);
        console.log('Created Users');

        // Create Sample Bookings
        const sampleBookings = [
            {
                center: createdCenters[0]._id,
                sport: createdSports.find(s => s.name === 'Badminton')._id,
                court: createdCourts.find(c => c.name === 'Badminton Court 1')._id,
                date: new Date('2024-05-20'),
                timeSlot: '10:00',
                customerName: 'John Doe',
            },
            {
                center: createdCenters[1]._id,
                sport: createdSports.find(s => s.name === 'Squash')._id,
                court: createdCourts.find(c => c.name === 'Squash Court 1')._id,
                date: new Date('2024-05-21'),
                timeSlot: '14:00',
                customerName: 'Jane Smith',
            },
            {
                center: createdCenters[2]._id,
                sport: createdSports.find(s => s.name === 'Tennis')._id,
                court: createdCourts.find(c => c.name === 'Tennis Court 1')._id,
                date: new Date('2024-05-22'),
                timeSlot: '16:00',
                customerName: 'Alice Wonder',
            },
            {
                center: createdCenters[3]._id,
                sport: createdSports.find(s => s.name === 'Basketball')._id,
                court: createdCourts.find(c => c.name === 'Basketball Court 1')._id,
                date: new Date('2024-05-23'),
                timeSlot: '18:00',
                customerName: 'Bob Builder',
            },
            {
                center: createdCenters[4]._id,
                sport: createdSports.find(s => s.name === 'Football')._id,
                court: createdCourts.find(c => c.name === 'Football Court 1')._id,
                date: new Date('2024-05-24'),
                timeSlot: '09:00',
                customerName: 'John Doe',
            },
        ];

        await Booking.insertMany(sampleBookings);
        console.log('Created Sample Bookings');

        console.log('Database seeded successfully');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding database:', error);
        mongoose.connection.close();
    }
};

seedDatabase();
