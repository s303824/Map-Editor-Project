import React from "react";
import { TextField, Link, Button, Modal, Box, Typography} from '@mui/material';
import { useNavigate } from "react-router-dom";
import "../App.css"
import bannerImage from '../assets/login-screen-image.png'

const SignOut = ({}) => {
  const navigate = useNavigate();

  const handleReturnHome = () => {
    navigate("/home")
  }
  const loginImage = <Box 
  component="img"
  alt="banner Image"
  src ={bannerImage}
  className = "login-image"
  />
      return (
        <Box className="login-page-holder">

        <Box className="login-box">
        <Box className="login-image-holder">
          <Box className="login-image-topper">
            <Box className="login-tileslate-text">TILESLATE</Box>
          </Box>
          <Box className="login-image">
            {loginImage} 
          </Box>
        </Box>
          <Box className="login-holder">
            <Box className="login-box-top">    
                <Box className="login-bar">
                  <Box>LOG OUT</Box>  
                  <Button variant="contained" color="error" fontSize="32px" onClick={handleReturnHome}>X</Button>
                </Box>
            </Box>
  
            <Box className="login-box-mid">
                
                <Box className="login-email-field">
                  <Typography>Are you sure you want to log out?</Typography>
                </Box>

                <Box className="login-button-holder">
                  <Button variant="contained" color="warning" onClick={handleReturnHome}>Logout</Button>
                </Box>
            </Box>
          </Box>
  
        </Box>
      </Box>);
};

export default SignOut;
