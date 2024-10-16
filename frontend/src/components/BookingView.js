// frontend/src/components/BookingView.js
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import {
    Typography,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    Alert,
} from '@mui/material';

const BookingView = ({ centerId, sportId, selectedDate, refresh }) => {
    const { axiosInstance } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await axiosInstance.get('/bookings', {
                    params: {
                        centerId,
                        sportId,
                        date: selectedDate,
                    },
                });
                setBookings(res.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch bookings.');
                setLoading(false);
            }
        };

        if (centerId && sportId && selectedDate) {
            setLoading(true);
            fetchBookings();
        }
    }, [axiosInstance, centerId, sportId, selectedDate, refresh]);

    if (loading) return <Typography>Loading bookings...</Typography>;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <div>
            <Typography variant="h6" gutterBottom>
                Bookings for {selectedDate}
            </Typography>
            {bookings.length === 0 ? (
                <Typography>No bookings available.</Typography>
            ) : (
                <Paper elevation={3}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Court</TableCell>
                                <TableCell>Time Slot</TableCell>
                                <TableCell>Customer Name</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {bookings.map((booking) => (
                                <TableRow key={booking._id}>
                                    <TableCell>{booking.court.name}</TableCell>
                                    <TableCell>{booking.timeSlot}</TableCell>
                                    <TableCell>{booking.customerName}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            )}
        </div>
    );
};

export default BookingView;
