import React, { useContext } from "react";
import { TextField, Button, Box, Typography} from '@mui/material';
import bannerImage from '../assets/login-screen-image.png'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../App.css"
import LoginModal from "../components/login-modal.component";
import AuthContext from "../auth";

const SignUp =() =>{
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [passwordVerify, setPasswordVerify] = useState("")

    const {auth} = useContext(AuthContext)
  
    const navigate = useNavigate();

    const handleSignIn = () => {
      navigate("/login")
    }

    const handleGoBack = () => {
      navigate("/", {})
    }

    const updateField = (event, type) => {
      switch(type){
        case "firstName":
          setFirstName(event.target.value)
          break;

        case "lastName":
          setLastName(event.target.value)
          break;

        case "username":
          setUsername(event.target.value)
          break;

        case "password":
          setPassword(event.target.value)
          break;

        case "passwordVerify":
          setPasswordVerify(event.target.value)
          break;

        case "email":
          setEmail(event.target.value)
          break;
      }

    }

    const handleCloseModal = () => {
      auth.retryRegister();
    }

    const handleCreateAccount = () => {
      let userData ={
        username: username,
        password: password,
        passwordVerify: passwordVerify,
        first_name: firstName,
        last_name: lastName,
        email:email,
        profile_picture: "https://res.cloudinary.com/natialemu47/image/upload/v1652196653/dnt17uj4nl9ywfq648v8.jpg"
      }
      auth.registerUser(userData)
    }
  
    const loginImage = <Box 
      component="img"
      alt="banner Image"
      src ={bannerImage}
      className = "login-image"
      />
    
      let loginModal = !auth.successfulRegister ? <LoginModal message={auth.error} onClose={handleCloseModal}></LoginModal> : null
  
    return (
        <Box className="login-page-holder">

        <Box className="signup-box">
          {loginModal}
  
          <Box className="signup-image-holder">
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
                  <Button variant="contained" color="error" fontSize="32px" onClick={handleGoBack}>X</Button>
                </Box>
            </Box>
  
            <Box className="signup-box-mid">
                
                <Box className="signup-field">
                  <Typography>First Name</Typography>
                  <TextField label="First Name" className="login-textfield" variant="filled" onChange={(event) => updateField(event, "firstName")}></TextField>
                </Box>
  
                <Box className="signup-field">
                  <Typography>Last Name</Typography>
                  <TextField label="Last Name" className="login-textfield" variant="filled" onChange={(event) => updateField(event, "lastName")}></TextField>
                </Box>
  
                <Box className="signup-field">
                  <Typography>User Name</Typography>
                  <TextField label="User Name" className="login-textfield" variant="filled" onChange={(event) => updateField(event, "username")}></TextField>
                </Box>

                <Box className="signup-field">
                  <Typography>Email Address</Typography>
                  <TextField label="Email Address" className="login-textfield" variant="filled" onChange={(event) => updateField(event, "email")}></TextField>
                </Box>

                <Box className="signup-field">
                  <Typography>Password</Typography>
                  <TextField label="Password" className="login-textfield" variant="filled" onChange={(event) => updateField(event, "password")}></TextField>
                </Box>
        
                <Box className="signup-field">
                  <Typography>Verify Password</Typography>
                  <TextField label="Verify Password" className="login-textfield" variant="filled" onChange={(event) => updateField(event, "passwordVerify")}></TextField>
                </Box>

                <Box className="login-button-holder">
                  <Button variant="contained" color="warning" onClick={handleCreateAccount}>CREATE ACCOUNT</Button>
                </Box>
  
                <Box className="login-bottom-text" paddingTop="2%">
                  <Typography>Have an account already?</Typography><Button variant="contained" onClick={handleSignIn}>Log In</Button>
                </Box>
            </Box>
          </Box>
  
        </Box>
      </Box>
    );
  }  


  export default SignUp;