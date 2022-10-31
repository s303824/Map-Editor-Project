import React from "react";
import styled, { css } from 'styled-components';
import { TextField, Link, Button, Modal, Box, Typography} from '@mui/material';
import { useNavigate } from "react-router-dom";
import "../App.css"

const SignOut = ({}) => {
  const navigate = useNavigate();

  const handleReturnHome = () => {
    navigate("/home")
  }
      return (
        <Box className="login-page-holder">

        <Box className="login-box">
  
          <Box className="login-holder">
            <Box className="login-box-top">    
                <Box className="login-bar">
                  <Box>LOG OUT</Box>  
                  <Button variant="contained" color="error" fontSize="32px">X</Button>
                </Box>
            </Box>
  
            <Box className="login-box-mid">
                
                <Box className="login-email-field">
                  <Typography>Are you sure you want to log out?</Typography>
                </Box>
  
                <Box className="login-email-field">
                  <Typography>Last Name</Typography>
                  <TextField label="Last Name" className="login-textfield"></TextField>
                </Box>

                <Box className="login-button-holder">
                  <Button variant="contained" color="warning">Logout</Button>
                </Box>
  
                <Box className="login-bottom-text" paddingTop="10%">
                  <Typography>Forgot your password?</Typography><Button variant="contained" onClick={handleReturnHome}>Log On</Button>
                </Box>
            </Box>
          </Box>
  
        </Box>
      </Box>);
};

export default SignOut;
