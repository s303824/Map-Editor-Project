import React from "react";
import styled, { css } from 'styled-components';
import { TextField, Link, Button, Modal, Box, Typography} from '@mui/material';
import bannerImage from '../assets/login-screen-image.png'
import { useNavigate } from "react-router-dom";
import "../App.css"

const SignUp =() =>{
    const navigate = useNavigate();

    const handleSignIn = () => {
      navigate("/login")
    }
  
    const loginImage = <Box 
      component="img"
      alt="banner Image"
      src ={bannerImage}
      className = "login-image"
      />
    
  
    return (
        <Box className="login-page-holder">

        <Box className="signup-box">
  
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
                  <Box>SIGN UP</Box>  
                  <Button variant="contained" color="error" fontSize="32px">X</Button>
                </Box>
            </Box>
  
            <Box className="signup-box-mid">
                
                <Box className="signup-field">
                  <Typography>First Name</Typography>
                  <TextField label="First Name" className="login-textfield"></TextField>
                </Box>
  
                <Box className="signup-field">
                  <Typography>Last Name</Typography>
                  <TextField label="Last Name" className="login-textfield"></TextField>
                </Box>
  
                <Box className="signup-field">
                  <Typography>User Name</Typography>
                  <TextField label="User Name" className="login-textfield"></TextField>
                </Box>

                <Box className="signup-field">
                  <Typography>Email Address</Typography>
                  <TextField label="Email Address" className="login-textfield"></TextField>
                </Box>

                <Box className="signup-field">
                  <Typography>Password</Typography>
                  <TextField label="Password" className="login-textfield"></TextField>
                </Box>
        
                <Box className="signup-field">
                  <Typography>Verify Password</Typography>
                  <TextField label="Verify Password" className="login-textfield"></TextField>
                </Box>

                <Box className="signup-field" paddingTop="1%">
                  <Button variant="contained" color="warning">CREATE AN ACCOUNT</Button>
                </Box>
  
                <Box className="login-bottom-text" paddingTop="2%">
                  <Typography>Have an account already?</Typography><Button variant="contained" onClick={handleSignIn}>Log On</Button>
                </Box>
            </Box>
          </Box>
  
        </Box>
      </Box>
    );
  }  


  export default SignUp;