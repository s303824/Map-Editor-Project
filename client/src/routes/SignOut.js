import React from "react";
import { Button, Box, Typography} from '@mui/material';
import { useNavigate } from "react-router-dom";
import "../App.css"
import AuthContext from "../auth";
import { useContext } from "react";
import Divider from '@mui/material/Divider';

const SignOut = ({}) => {
  const navigate = useNavigate();
  const {auth} = useContext(AuthContext)

  const handleReturnHome = () => {
    navigate("/home")
  }

  const handleLogout = () => {
    auth.logoutUser();
    navigate("/home")
  }


      return (
        <Box className="login-page-holder">

        <Box className="logout-box">
          <Box className="login-holder" style={{"margin": "0px 0px 0px 20px"}}>
            <Box className="login-box-top">    
                <Box className="login-bar">
                  <Box>LOG OUT</Box>  
                  <Button variant="contained" color="error" fontSize="32px" onClick={handleReturnHome}>X</Button>
                </Box>
            </Box>
            <Divider variant="middle" sx={{borderBottomWidth: 4, "border-color": 'white', marginTop: '3%', marginRight: '5%'}}/>
  
            <Box className="login-box-mid">
                
                <Box className="login-email-field">
                  <Typography variant="h5" >Are you sure you want to log out?</Typography>
                </Box>

                <Box className="login-button-holder" style={{position: "absolute", right: "2%", bottom: "3%"}}>
                  <Button variant="outlined" color="error" size="large" style={{"border-radius": "10%"}} onClick={handleLogout}>Logout</Button>
                </Box>
            </Box>
          </Box>
  
        </Box>
      </Box>);
};

export default SignOut;
