import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import GitHubIcon from '@mui/icons-material/GitHub'; // Import GitHub icon

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: 'primary.main',
                color: 'white',
                py: 2,
                mt: 'auto',
            }}
        >
            <Typography variant="body1" align="center">
                Made with{' '}
                <FavoriteIcon fontSize="small" sx={{ verticalAlign: 'middle', color: 'error.main' }} />{' '}
                by{' '}
                <Link href="https://github.com/TechnoAyan7" color="inherit" underline="always">
                    technoayan7
                </Link>{' '}
                <GitHubIcon fontSize="small" sx={{ verticalAlign: 'middle', ml: 0.5 }} /> {/* GitHub icon */}
            </Typography>
        </Box>
    );
};

export default Footer;
