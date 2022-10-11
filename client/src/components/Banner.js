import '../App.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { Button } from '@mui/material';
import { GlobalStoreContext } from '../store'
import "../App.css"
import { useNavigate } from 'react-router-dom';
import AuthContext from '../auth';

function Banner() {

    const navigate = useNavigate()
    const {auth} = useContext(AuthContext)

    function handleLogin() {
        navigate('/login',{})
    }

    function handleLogout() {
        auth.logoutUser();
    }

    let loginButton = true ? <Link to="/login">Login</Link> :
    <Box></Box>
    let signUpButton = true ? <Link to="/signup">Sign Up</Link> :
    <Box></Box>

    let accBox = <Box marginRight="10px">{loginButton}    {signUpButton}</Box>


    if(auth.loggedIn) {
        accBox = <Box className="horizontal-list">
                    <Box paddingRight="10px">{auth.user.username}</Box>
                    <Button variant="contained"  onClick={handleLogout}>Log out</Button>
                </Box>
    }
    

    return (
        <Box sx={{ flexGrow: 1 }} >
            <Box className="banner">

            <Link to="/">Gameshow</Link>    
            {accBox}        
            </Box>
        </Box>
    );
  }

  export default Banner;
