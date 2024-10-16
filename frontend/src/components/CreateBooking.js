// frontend/src/components/CreateBooking.js
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import {
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Button,
    Alert,
    Grid,
} from '@mui/material';

const CreateBooking = ({ centerId, sportId, selectedDate, onBookingCreated }) => {
    const { axiosInstance } = useContext(AuthContext);
    const [courts, setCourts] = useState([]);
    const [timeSlots] = useState([
        '09:00', '10:00', '11:00', '12:00',
        '13:00', '14:00', '15:00', '16:00',
        '17:00', '18:00', '19:00',
    ]);
    const [formData, setFormData] = useState({
        courtId: '',
        timeSlot: '',
        customerName: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loadingCourts, setLoadingCourts] = useState(true);

    useEffect(() => {
        const fetchCourts = async () => {
            try {
                // Fetch all courts and filter based on sportId and centerId
                const res = await axiosInstance.get('/courts');
                const filteredCourts = res.data.filter(
                    (court) =>
                        court.sport._id === sportId && court.center._id === centerId
                );
                setCourts(filteredCourts);
                setLoadingCourts(false);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch courts.');
                setLoadingCourts(false);
            }
        };

        if (centerId && sportId) {
            fetchCourts();
        }
    }, [axiosInstance, centerId, sportId]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const { courtId, timeSlot, customerName } = formData;

        if (!courtId || !timeSlot || !customerName) {
            setError('All fields are required.');
            return;
        }

        try {
            const res = await axiosInstance.post('/bookings', {
                centerId,
                sportId,
                courtId,
                date: selectedDate,
                timeSlot,
                customerName,
            });

            setSuccess('Booking created successfully.');
            setFormData({
                courtId: '',
                timeSlot: '',
                customerName: '',
            });
            onBookingCreated(); // Notify parent to refresh bookings
        } catch (err) {
            console.error(err);
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('An error occurred while creating the booking.');
            }
        }
    };

    if (loadingCourts) return <Typography>Loading courts...</Typography>;

    return (
        <div>
            <Typography variant="h6" gutterBottom>
                Create Booking
            </Typography>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel id="court-select-label">Court</InputLabel>
                            <Select
                                labelId="court-select-label"
                                id="court-select"
                                name="courtId"
                                value={formData.courtId}
                                label="Court"
                                onChange={handleChange}
                            >
                                <MenuItem value="" disabled>
                                    --Select Court--
                                </MenuItem>
                                {courts.map((court) => (
                                    <MenuItem key={court._id} value={court._id}>
                                        {court.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel id="time-slot-select-label">Time Slot</InputLabel>
                            <Select
                                labelId="time-slot-select-label"
                                id="time-slot-select"
                                name="timeSlot"
                                value={formData.timeSlot}
                                label="Time Slot"
                                onChange={handleChange}
                            >
                                <MenuItem value="" disabled>
                                    --Select Time Slot--
                                </MenuItem>
                                {timeSlots.map((slot) => (
                                    <MenuItem key={slot} value={slot}>
                                        {slot}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            label="Customer Name"
                            name="customerName"
                            value={formData.customerName}
                            onChange={handleChange}
                            required
                            fullWidth
                            variant="outlined"
                            placeholder="Enter customer name"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                        >
                            Create Booking
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default CreateBooking;
