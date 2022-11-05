import React, { useContext } from "react";
import { TextField, Button, Box, Typography} from '@mui/material';
import { useState } from "react";
import bannerImage from '../assets/login-screen-image.png'
import { useNavigate } from "react-router-dom";
import LoginModal from "../components/login-modal.component";
import AuthContext from "../auth";
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';

const SignIn = ({}) => {

  const [errMessage, setErrMessage] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { auth } = useContext(AuthContext)

  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/signup")
  }

  const handleForgotPassword = () => {
    navigate("/reset")
  }

  const handleGoBack = () => {
    navigate("/", {})
  }

  const handleCloseModal = () => {
    auth.retryLogin();
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = () => {
    let userData = {
      email: email,
      password:password,
    }
    auth.setLoggedIn(userData)
    
  }

  const loginImage = <Box 
    component="img"
    alt="banner Image"
    src ={bannerImage}
    className = "login-image"
    />

    //only show modal if login fails
    let loginModal = !auth.successfulLogin ? <LoginModal message={auth.error} onClose={handleCloseModal}></LoginModal> : null
  

  return (
    <Box className="login-page-holder">

      <Box className="login-box">

      {loginModal}

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

          <Divider variant="middle" sx={{borderBottomWidth: 4, "border-color": 'white', "margin-top": "2%", "margin-left": "-3%"}}/>

          <Box className="login-box-mid">
              
              <Box className="login-email-field">
                <Typography>Email</Typography>
                <TextField label="Email" className="login-textfield" variant="filled" onChange={handleEmailChange} value={email}></TextField>
              </Box>

              <Box className="login-email-field">
                <Typography>Password</Typography>
                <TextField label="Password" className="login-textfield" type="password" variant="filled" onChange={handlePasswordChange} value={password}></TextField>
              </Box>

              <Box className="login-button-holder">
                <Button variant="contained" color="warning" className='button-color' onClick={handleLogin}>Login</Button>
              </Box>

              <Box className="login-bottom-text" paddingTop="10%">
                <Typography>Forgot your password?</Typography><Link href="#" underline="hover" onClick={handleForgotPassword}>{'Reset'}</Link>
              </Box>

              <Box className="login-bottom-text">
              <Typography>New to Tileslate?</Typography><Link href="#" underline="hover" onClick={handleSignUp}>{'Sign Up'}</Link>
              </Box>
          </Box>
        </Box>

      </Box>
    </Box>
  );
};


export default SignIn;
