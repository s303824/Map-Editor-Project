import React, { useContext } from "react";
import { TextField, Button, Box, Typography} from '@mui/material';
import bannerImage from '../assets/login-screen-image.png'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../App.css"
import LoginModal from "../components/login-modal.component";
import AuthContext from "../auth";
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';


const SignUp =() =>{
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [passwordVerify, setPasswordVerify] = useState("")
    const [passwordModal, setPasswordModal] = React.useState(false);
    const [emailModal, setEmailModal] = React.useState(false);

    const {auth} = useContext(AuthContext)
  
    const navigate = useNavigate();
    
    const handleEmailModalClose = () => {
          setEmailModal(false)
        }
    const handlePasswordModalClose = () => {
        setPasswordModal(false)
    }
    const password_modal = passwordModal ? <LoginModal message = "Password should have at least 1 lower, 1 upper case and 1 number. Password should also be longer than 8 characters!" onClose={handlePasswordModalClose}></LoginModal>: null;
    const email_modal = emailModal ? <LoginModal message = "Email is invalid!" onClose={handleEmailModalClose}></LoginModal>: null;
    
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
      let mail_format = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      let password_format = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).{8,}/;
      if (!mail_format.test(email)) {
        setEmailModal(true)
        return;
			}
      if (!password_format.test(password)) {
        setPasswordModal(true)
        return;
      }
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
          
        {password_modal}
        {email_modal}

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
            <Divider variant="middle" sx={{borderBottomWidth: 4, "border-color": 'white', "margin-top": "2%", "margin-left": "-3%", "margin-bottom": "1%"}}/>

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
                  <TextField label="Password" className="login-textfield" type="password" variant="filled" onChange={(event) => updateField(event, "password")}></TextField>
                </Box>
        
                <Box className="signup-field">
                  <Typography>Verify Password</Typography>
                  <TextField label="Verify Password" className="login-textfield" type="password" variant="filled" onChange={(event) => updateField(event, "passwordVerify")}></TextField>
                </Box>

                <Box className="login-button-holder">
                  <Button variant="contained" color="warning" className='button-color'  onClick={handleCreateAccount}>CREATE ACCOUNT</Button>
                </Box>
  
                <Box className="login-bottom-text" paddingTop="2%">
                  <Typography>Have an account already?</Typography><Link href="#" underline="hover" onClick={handleSignIn}>{'Log In'}</Link>
                </Box>
            </Box>
          </Box>
  
        </Box>
      </Box>
    );
  }  


  export default SignUp;