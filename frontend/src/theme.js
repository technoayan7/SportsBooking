// frontend/src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2', // Customize your primary color
        },
        secondary: {
            main: '#dc004e', // Customize your secondary color
        },
        background: {
            default: '#f5f5f5', // Page background color
        },
    },
    typography: {
        h1: {
            fontSize: '2rem',
            fontWeight: 600,
        },
        h2: {
            fontSize: '1.5rem',
            fontWeight: 500,
        },
        h3: {
            fontSize: '1.2rem',
            fontWeight: 500,
        },
    },
});

export default theme;
