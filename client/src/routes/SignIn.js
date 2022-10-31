import React from "react";
import styled, { css } from 'styled-components';
import { TextField, Link, Button, Modal, Box, Typography} from '@mui/material';
import bannerImage from '../assets/login-screen-image.png'
import { useNavigate } from "react-router-dom";

const SignIn = ({}) => {

  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/signup")
  }

  const handleGoBack = () => {
    navigate("/", {})
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
                <Box>SIGN IN</Box>  
                <Button variant="contained" color="error" fontSize="32px" onClick={handleGoBack}>X</Button>
              </Box>
          </Box>

          <Box className="login-box-mid">
              
              <Box className="login-email-field">
                <Typography>Email</Typography>
                <TextField label="Email" className="login-textfield"></TextField>
              </Box>

              <Box className="login-email-field">
                <Typography>Password</Typography>
                <TextField label="Password" className="login-textfield"></TextField>
              </Box>

              <Box className="login-button-holder">
                <Button variant="contained" color="warning">Login</Button>
              </Box>

              <Box className="login-bottom-text" paddingTop="10%">
                <Typography>Forgot your password?</Typography><Button variant="contained">Reset</Button>
              </Box>

              <Box className="login-bottom-text">
              <Typography>New to Tileslate?</Typography><Button variant="contained" onClick={handleSignUp}>Sign Up</Button>
              </Box>
          </Box>
        </Box>

      </Box>
    </Box>
  );
};


export default SignIn;
