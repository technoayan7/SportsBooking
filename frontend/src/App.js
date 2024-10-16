// frontend/src/App.js
import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import CenterSelector from './components/CenterSelector';
import SportSelector from './components/SportSelector';
import BookingView from './components/BookingView';
import CreateBooking from './components/CreateBooking';
import Login from './components/Login';
import Register from './components/Register';
import Footer from './components/footer';
import { AuthContext, AuthProvider } from './context/AuthContext';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import Tooltip from '@mui/material/Tooltip';


const AppContent = () => {
  const { auth, logout } = useContext(AuthContext);

  const [selectedCenter, setSelectedCenter] = useState('');
  const [selectedSport, setSelectedSport] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [refreshBookings, setRefreshBookings] = useState(false);

  const handleBookingCreated = () => {
    // Toggle to trigger re-fetching bookings
    setRefreshBookings(!refreshBookings);
  };

  return (
    <Router>
      <AppBar position="static">
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <SportsSoccerIcon sx={{ marginRight: 1 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>
                Sports Booking App
              </Link>
            </Typography>
            {auth.user ? (
              <Box display="flex" alignItems="center">
                <Typography variant="body1" sx={{ marginRight: 2 }}>
                  {auth.user.username}
                </Typography>
                <Tooltip title="Logout">
                  <Button color="inherit" startIcon={<LogoutIcon />} onClick={logout}>
                    Logout
                  </Button>
                </Tooltip>
              </Box>
            ) : (
              <Box>
                <Button color="inherit" component={Link} to="/login">
                  Login
                </Button>
                <Button color="inherit" component={Link} to="/register">
                  Register
                </Button>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="lg" sx={{ marginTop: 4 }}>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={!auth.user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/register"
            element={!auth.user ? <Register /> : <Navigate to="/" />}
          />

          {/* Protected Routes */}
          <Route
            path="/"
            element={auth.user ? (
              <Box>
                <Box sx={{ marginBottom: 4 }}>
                  <CenterSelector onSelect={setSelectedCenter} />
                </Box>

                {selectedCenter && (
                  <Box sx={{ marginBottom: 4 }}>
                    <SportSelector centerId={selectedCenter} onSelect={setSelectedSport} />
                  </Box>
                )}

                {selectedSport && (
                  <Box sx={{ marginBottom: 4 }}>
                    <Typography variant="h6" gutterBottom>
                      Select Date
                    </Typography>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      style={{
                        padding: '8px',
                        fontSize: '16px',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                      }}
                    />
                  </Box>
                )}

                {selectedCenter && selectedSport && selectedDate && (
                  <Box>
                    <Box sx={{ marginBottom: 4 }}>
                      <BookingView
                        centerId={selectedCenter}
                        sportId={selectedSport}
                        selectedDate={selectedDate}
                        refresh={refreshBookings}
                      />
                    </Box>
                    <Box sx={{ marginBottom: 4 }}>
                      <CreateBooking
                        centerId={selectedCenter}
                        sportId={selectedSport}
                        selectedDate={selectedDate}
                        onBookingCreated={handleBookingCreated}
                      />
                    </Box>
                  </Box>
                )}
              </Box>
            ) : (
              <Navigate to="/login" />
            )}
          />

          {/* Redirect unknown routes to home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
      <Footer /> 
    </Router>
  );
};

const App = () => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
);

export default App;
