// frontend/src/components/Login.js
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import {
    TextField,
    Button,
    Typography,
    Paper,
    Grid,
    Alert,
} from '@mui/material';

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [error, setError] = useState('');

    const { username, password } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const response = await login(username, password);
        if (response.success) {
            navigate('/');
        } else {
            setError(response.message);
        }
    };

    return (
        <Grid container justifyContent="center">
            <Grid item xs={12} sm={8} md={6} lg={4}>
                <Paper elevation={3} sx={{ padding: 4 }}>
                    <Typography variant="h5" component="h2" gutterBottom align="center">
                        Login
                    </Typography>
                    {error && <Alert severity="error">{error}</Alert>}
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Username -> technoayan"
                            name="username"
                            value={username}
                            onChange={handleChange}
                            required
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            label="Password -> test1234"
                            name="password"
                            type="password"
                            value={password}
                            onChange={handleChange}
                            required
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ marginTop: 2 }}
                        >
                            Login
                        </Button>
                    </form>
                    <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
                        Don't have an account? <Link to="/register">Register Here</Link>
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Login;
