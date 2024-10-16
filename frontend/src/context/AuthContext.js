// frontend/src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create Context
export const AuthContext = createContext();

// Provider Component
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        token: localStorage.getItem('token') || null,
        user: JSON.parse(localStorage.getItem('user')) || null,
    });

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

    // Function to handle login
    const login = async (username, password) => {
        try {
            const res = await axios.post(`${API_BASE_URL}/auth/login`, { username, password });
            const { token, user } = res.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            setAuth({ token, user });
            return { success: true };
        } catch (err) {
            console.error('Login Error:', err.response?.data?.message || err.message);
            return { success: false, message: err.response?.data?.message || 'Login failed.' };
        }
    };

    // Function to handle registration
    const register = async (username, password) => {
        try {
            const res = await axios.post(`${API_BASE_URL}/auth/register`, { username, password });
            const { token, user } = res.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            setAuth({ token, user });
            return { success: true };
        } catch (err) {
            console.error('Registration Error:', err.response?.data?.message || err.message);
            return { success: false, message: err.response?.data?.message || 'Registration failed.' };
        }
    };

    // Function to handle logout
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setAuth({ token: null, user: null });
    };

    // Axios instance with interceptor to attach token
    const axiosInstance = axios.create({
        baseURL: API_BASE_URL,
    });

    axiosInstance.interceptors.request.use(
        (config) => {
            if (auth.token) {
                config.headers.Authorization = `Bearer ${auth.token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    return (
        <AuthContext.Provider value={{ auth, login, register, logout, axiosInstance }}>
            {children}
        </AuthContext.Provider>
    );
};
