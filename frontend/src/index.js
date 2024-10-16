// frontend/src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme'; // Import the custom theme

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Normalize CSS across browsers */}
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
