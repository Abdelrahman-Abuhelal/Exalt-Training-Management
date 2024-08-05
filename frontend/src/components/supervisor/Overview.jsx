import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Button, Box } from '@mui/material';
import axios from 'axios';
import { useAuth } from "../../provider/authProvider";
import { useTheme } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";

const Overview = () => {
    const { user } = useAuth();
    const { login_token } = user;
    const baseUrl = import.meta.env.VITE_PORT_URL;
    const theme = useTheme();
    const navigate = useNavigate();


    const paperStyle = {
        padding: 20,
        backgroundColor: theme.palette.background.paper,
        color: '#333',
    };
    return (
        <Grid container spacing={5} >
            <Grid item xs={12} sm={4} md={4}>
                <Paper  elevation={3} style={paperStyle}>
                    <Typography className="concert-one-regular" variant='inherit' sx={{ color: theme.palette.primary.dark }} >My Trainees</Typography>
                    <Typography variant="h4" sx={{ color: theme.palette.primary.dark }}>{15}</Typography>
                    <Box mt={2}>
                        <Button variant="contained" color="primary" onClick={() => navigate('/trainees')}>
                            View
                        </Button>
                    </Box>
                </Paper>
            </Grid>

            <Grid item xs={12} sm={4} md={4}>
                <Paper  elevation={3} style={paperStyle}>
                    <Typography className="concert-one-regular" variant='inherit' sx={{ color: theme.palette.primary.dark }} >Tasks Assigned</Typography>
                    <Typography variant="h4" sx={{ color: theme.palette.primary.dark }}>{6}</Typography>
                    <Box mt={2}>
                        <Button variant="contained" color="primary" onClick={() => navigate('/superadmins')}>
                            View
                        </Button>
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
                <Paper elevation={3} style={paperStyle}>
                    <Typography className="concert-one-regular" variant='inherit' sx={{ color: theme.palette.primary.dark }} >Forms Recieved</Typography>
                    <Typography variant="h4" sx={{ color: theme.palette.primary.dark }}>{6}</Typography>
                    <Box mt={2}>
                        <Button variant="contained" color="primary" onClick={() => navigate('/superadmins')}>
                            View
                        </Button>
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
                <Paper elevation={3} style={paperStyle}>
                    <Typography className="concert-one-regular" variant='inherit' sx={{ color: theme.palette.primary.dark }} >Trainees Skills</Typography>
                    <Typography variant="h4" sx={{ color: theme.palette.primary.dark }}>{}</Typography>
                    <Box mt={2}>
                        <Button variant="contained" color="primary" onClick={() => navigate('/supervisors')}>
                            View
                        </Button>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    );

}

export default Overview;
