// frontend/src/components/CenterSelector.js
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
import CircularProgress from '@mui/material/CircularProgress';


const CenterSelector = ({ onSelect }) => {
    const { axiosInstance } = useContext(AuthContext);
    const [centers, setCenters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCenters = async () => {
            try {
                const res = await axiosInstance.get('/centers');
                setCenters(res.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch centers.');
                setLoading(false);
            }
        };

        fetchCenters();
    }, [axiosInstance]);

    const handleChange = (e) => {
        onSelect(e.target.value);
    };

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <div>
            <Typography variant="h6" gutterBottom>
                Select Center
            </Typography>
            <FormControl fullWidth>
                <InputLabel id="center-select-label">Center</InputLabel>
                <Select
                    labelId="center-select-label"
                    id="center-select"
                    defaultValue=""
                    label="Center"
                    onChange={handleChange}
                >
                    <MenuItem value="" disabled>
                        --Select Center--
                    </MenuItem>
                    {centers.map((center) => (
                        <MenuItem key={center._id} value={center._id}>
                            {center.name} - {center.location}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

export default CenterSelector;
