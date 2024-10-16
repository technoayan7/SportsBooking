// frontend/src/components/SportSelector.js
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography,
    Alert,
} from '@mui/material';

const SportSelector = ({ centerId, onSelect }) => {
    const { axiosInstance } = useContext(AuthContext);
    const [sports, setSports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchSports = async () => {
            try {
                const res = await axiosInstance.get(`/centers/${centerId}`);
                setSports(res.data.sports);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch sports.');
                setLoading(false);
            }
        };

        if (centerId) {
            fetchSports();
        }
    }, [axiosInstance, centerId]);

    const handleChange = (e) => {
        onSelect(e.target.value);
    };

    if (loading) return <Typography>Loading sports...</Typography>;
    if (error) return <Alert severity="error">{error}</Alert>;
    if (sports.length === 0) return <Typography>No sports available for this center.</Typography>;

    return (
        <div>
            <Typography variant="h6" gutterBottom>
                Select Sport
            </Typography>
            <FormControl fullWidth>
                <InputLabel id="sport-select-label">Sport</InputLabel>
                <Select
                    labelId="sport-select-label"
                    id="sport-select"
                    defaultValue=""
                    label="Sport"
                    onChange={handleChange}
                >
                    <MenuItem value="" disabled>
                        --Select Sport--
                    </MenuItem>
                    {sports.map((sport) => (
                        <MenuItem key={sport._id} value={sport._id}>
                            {sport.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

export default SportSelector;
