import React, { StrictMode } from "react";
import { useContext, useEffect, useState } from 'react';
import { TextField, Button, Box, Typography, Modal} from '@mui/material';
import bannerImage from '../assets/login-screen-image.png'
import { useNavigate } from "react-router-dom";
import LoginModal from "../components/login-modal.component";
import AuthContext from '../auth';
import api from '../api'

const PasswordReset = ({}) => {

  const navigate = useNavigate();
  const {auth} = useContext(AuthContext);

  const [email, setEmail] = useState("");   // store user email
  const [enterEmail, setEnterEmail] = useState(true)    
  const [emailSent, setEmailSent] = useState(false);    // passcode verification
  const [userAttempt, setUserAttempt] = useState("");
  const [wrongPasscode, setWrongPasscode] = useState(false);

  const [codeVerify, setCodeVerify] = useState(false);    // user verified, now change password
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [wrongConfirm, setWrongConfirm] = useState(false);

  const [invalidEmail, setInvalidEmail] = useState(false)

  
  const handleSignUp = () => {
    navigate("/login")
  }

  const handleGoBack = () => {
    navigate("/", {})
  }

  const updateField = (event, type) => {
    switch(type){
        case "email":
          setEmail(event.target.value)
            break;
        case "passcode":
          setUserAttempt(event.target.value)
            break;
        case "new_password":
            setNewPassword(event.target.value)
            break;
        case "confirm":
            setConfirm(event.target.value)
            break;
    }
}  

// send email and move to the "Enter Passcode" modal
  const handleVerification = async() => {
      let userData = {
        email: email,
      }
      try{
        const response = await api.sendEmail(userData);
        if(response.status === 200){
            console.log("email sent")
            setEnterEmail(false)
            setEmailSent(true)       
        }
        else{
          setInvalidEmail(true)
        }
    }catch(error){
        setInvalidEmail(true)
    }
    }

  // check if entered passcode is correct
  const handlePasscodeCheck = async () => {
    let userData = {
      email: email,
      attempt: parseInt(userAttempt)
    }
    try{
      const response = await api.passcodeVerify(userData);
      if(response.status === 200){
          console.log("passcode verified")
          let userData = { email: email }
          setEmailSent(false);
          setCodeVerify(true); 
          auth.emailVerified(userData)
        }
      else{
          console.log("passcode incorrect")
          setWrongPasscode(true)
        }
    }catch(error){
        setWrongPasscode(true)
    }
  }

  // check if new password is valid and the same as the input from the confirmed password field
  const handleNewPasswordClose = () => {
      let password_format = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).{8,}/;
      if(newPassword != confirm){
        setWrongConfirm(true)
      }
      else if(!password_format.test(newPassword)){
        setInvalidPassword(true)
      }
      else {
        const userData = {
          id: auth.user._id,
          password: newPassword,
          passwordVerify: confirm,
        }
        auth.passwordReset(userData);
      }
  }

  const loginImage = <Box 
    component="img"
    alt="banner Image"
    src ={bannerImage}
    className = "login-image"
    />

    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: "#524d4d",
      color: "white",
      backgroundImage :'linear-gradient(to bottom, #505051, #303031)',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };

  const enterEmailModal = enterEmail ?
  <Box className="login-holder">
  <Box className="login-box-top">    
      <Box className="login-bar">
        <Box>PASSWORD RESET</Box>  
        <Button variant="contained" color="error" fontSize="32px" onClick={handleGoBack}>X</Button>
      </Box>
  </Box>

  <Box className="login-box-mid">
      
    <Box className="login-email-field">
        <Typography>Email</Typography>
        <TextField label="Email" className="login-textfield" variant="filled" onChange={(event) => updateField(event, "email")}></TextField>
      </Box>

      <Box className="login-button-holder">
        <Button variant="contained" color="warning" onClick = {handleVerification}>Send Passcode</Button>
      </Box>

      <Box className="login-bottom-text">
      <Typography>Suddenly remember your password?</Typography><Button variant="contained" onClick={handleSignUp}>Sign In</Button>
      </Box>
  </Box>
</Box> : null;


  const enterPasscodeModal = emailSent ?
  <Box className="login-holder">
  <Box className="login-box-top">    
      <Box className="login-bar">
        <Box>ENTER PASSCODE</Box>  
        <Button variant="contained" color="error" fontSize="32px" onClick={handleGoBack}>X</Button>
      </Box>
  </Box>

  <Box className="login-box-mid">
      
    <Box className="login-email-field">
        <Typography>Passcode</Typography>
        <TextField label="Passcode" className="login-textfield" variant="filled" onChange={(event) => updateField(event, "passcode")}></TextField>
      </Box>

      <Box className="login-button-holder">
        <Button variant="contained" color="warning" onClick = {handlePasscodeCheck}>Reset Password</Button>
      </Box>

      <Box className="login-bottom-text">
      <Typography>Suddenly remember your password?</Typography><Button variant="contained" onClick={handleSignUp}>Sign In</Button>
      </Box>
  </Box>
</Box>: null;

  const newPasswordModal = codeVerify ?   
  <Box className="login-holder">
  <Box className="login-box-top">    
      <Box className="login-bar">
        <Box>RESET PASSWORD</Box>  
        <Button variant="contained" color="error" fontSize="32px">X</Button>
      </Box>
  </Box>

  <Box className="login-box-mid">
      
      <Box className="login-email-field">
        <Typography>New Password</Typography>
        <TextField id="outlined-password-input" label="Password" type="password" className="login-textfield" variant="filled" onChange={(event) => updateField(event, "new_password")}></TextField>
      </Box>

      <Box className="login-email-field">
        <Typography>Confirm Password</Typography>
        <TextField id="outlined-password-input" label="Confirm Password" type="password" className="login-textfield" variant="filled" onChange={(event) => updateField(event, "confirm")}></TextField>
      </Box>

      <Box className="login-button-holder">
        <Button variant="contained" color="warning" onClick = {handleNewPasswordClose}>Reset Password</Button>
      </Box>
  </Box>
</Box>: null;

const wrongPasscodeModal = wrongPasscode ? <LoginModal message="The passcode provided is incorrect." onClose={() => closeWrongPasscode()}></LoginModal> : null
const wrongConfirmModal = wrongConfirm ? <LoginModal message="Both passwords must match." onClose={() => closeWrongConfirm()}></LoginModal> : null
const invalidPasswordModal = invalidPassword ? <LoginModal message="The password must be more than 8 characters and include uppercase, lowercase, and numbers." onClose={() => closeInvalidPassword()}></LoginModal> : null
const invaliEmailModal = invalidEmail ? <LoginModal message="The is no account associated with the email provided." onClose={() => closeInvalidEmail()}></LoginModal> : null

const closeWrongPasscode = () => {
  setWrongPasscode(false)
}
const closeWrongConfirm = () => {
  setWrongConfirm(false)
}
const closeInvalidPassword = () => {
  setInvalidPassword(false)
}
const closeInvalidEmail = () => {
  setInvalidEmail(false)
  setCodeVerify(false)  
  setEnterEmail(true)
}


  return (
    <Box className="login-page-holder">
      {wrongPasscodeModal}
      {wrongConfirmModal}
      {invalidPasswordModal}  
      {invaliEmailModal}
      <Box className="login-box">
        <Box className="login-image-holder">
          <Box className="login-image-topper">
            <Box className="login-tileslate-text">TILESLATE</Box>
          </Box>
          <Box className="login-image">
            {loginImage} 
          </Box>
        </Box>
        {enterPasscodeModal}
        {newPasswordModal}
        {enterEmailModal}
      </Box>
    </Box>
  );
};


export default PasswordReset;
