import '../App.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom'

export default function Banner() {
    return (
        <Box sx={{ flexGrow: 1 }} >
        <AppBar position="static" id="app-bar">
            <Toolbar>
                <Typography                        
                    variant="h4"
                    noWrap
                    component="div"
                    sx={{ display: { xs: 'none', sm: 'block' } }}                        
                >
                    <Link to="/">Gameshow</Link>
                </Typography>
                <Box sx={{ flexGrow: 1 }}></Box>
            </Toolbar>
        </AppBar>
    </Box>
    );
  }
