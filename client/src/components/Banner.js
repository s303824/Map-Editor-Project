import '../App.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import { Button } from '@mui/material';
import { GlobalStoreContext } from '../store'
import "../App.css"
import { useNavigate } from 'react-router-dom';

export default function Banner() {

    const navigate = useNavigate()

    function handleLogin() {
        navigate('/login',{})
    }

    let loginButton = true ? <Link to="/login">Login</Link> :
    <Box></Box>
    let signUpButton = true ? <Link to="/signup">Sign Up</Link> :
    <Box></Box>

    let accBox = <Box>{loginButton}{signUpButton}</Box>

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
                
                    {accBox}

                
                
                <Box sx={{ flexGrow: 1 }}></Box>
            </Toolbar>
        </AppBar>
        
    </Box>
    );
  }
