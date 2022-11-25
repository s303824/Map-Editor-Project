import React, { StrictMode } from "react";
import { useContext, useEffect, useState } from 'react';
import { TextField, Button, Box, Typography, Modal} from '@mui/material';
import bannerImage from '../assets/login-screen-image.png'
import { useNavigate } from "react-router-dom";
import LoginModal from "../components/login-modal.component";
import AuthContext from '../auth';

const PasswordReset = ({}) => {

  const navigate = useNavigate();
  const {auth} = useContext(AuthContext);

  const [email, setEmail] = useState("");   // store user email

  const [emailSent, setEmailSent] = useState(false);    // passcode verification
  const [passcode, setPasscode] = useState("");
  const [userAttempt, setUserAttempt] = useState("");
  const [wrongPasscode, setWrongPasscode] = useState(false);

  const [codeVerify, setCodeVerify] = useState(false);    // user verified, now change password
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [wrongConfirm, setWrongConfirm] = useState(false);

  const [user, setUser] = useState(auth.user);

  
// Require:
var postmark = require("postmark");

// Send an email:
var client = new postmark.ServerClient("e6e0a7f9-eaed-43f2-986c-a4a8267fef50");


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
  const handleVerification = () => {
      let code = Math.floor(1000000 + Math.random() * 9000000);
      setPasscode(code.toString())

      client.sendEmail({
        "From": "sean.yang@stonybrook.edu",
        "To": email,
        "Subject": "Tileslate Email Verification",
        "HtmlBody": "<strong>Hello</strong> dear user.",
        "TextBody": "Your Tileslate passcode is: " + passcode,
        "MessageStream": "outbound"
      });
      setEmailSent(true)
  }

  // check if entered passcode is correct
  const handlePasscodeCheck = () => {
    if(passcode == userAttempt){
      setEmailSent(false);
      setCodeVerify(true);
      auth.emailVerified(email)
      setUser(auth.user)  
    }
    else{
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
      setCodeVerify(false);

      const userData = {
        id: auth.user._id,
        currentPassword: auth.user.password,
        password: newPassword,
        passwordVerify: confirm,
      }
      auth.setNewPassword(userData);
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


  const enterPasscodeModal = emailSent ?
  <Box>
  {wrongPasscodeModal}
  <Modal
      open={true}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
>     
      <Box sx={style}>
      <Typography fontSize="20px">
          <Box className="qmodal-text">Passcode</Box>
          <TextField
          required
          id="outlined-title-input"
          label="Passcode"
          variant="filled"
          className = "text-field"
          onChange={(event) => updateField(event, "passcode")}
          />
      </Typography>
      <Box display="flex" justifyContent="space-between">
      <Button variant="contained" onClick={handlePasscodeCheck()} marginLeft={3}>Reset Password</Button>
      </Box>
      </Box>
  </Modal>
  </Box> : null;

  const newPasswordModal = codeVerify ?   
  <Box>
  {wrongConfirmModal}
  {invalidPasswordModal}
  <Modal
      open={true}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
>     
      <Box sx={style}>

      <Typography fontSize="20px">
          <Box className="qmodal-text">Password</Box>
          <TextField
          required
          id="outlined-title-input"
          variant="filled"
          className = "text-field"
          onChange={(event) => updateField(event, "new_password")}
          />
          <Box className="qmodal-text">Confirm Password</Box>
          <TextField
          required
          id="outlined-title-input"
          variant="filled"
          className = "text-field"
          onChange={(event) => updateField(event, "confirm")}
          />

      </Typography>
      <Box display="flex" justifyContent="space-between">
          <Button variant="contained" onClick={handleNewPasswordClose()} marginLeft={3}>Log In</Button>
      </Box>
      </Box>
  </Modal>
  </Box> : null;

const wrongPasscodeModal = wrongPasscode ? <LoginModal message="The passcode provided is incorrect." onClose={setWrongPasscode(false)}></LoginModal> : null
const wrongConfirmModal = wrongConfirm ? <LoginModal message="Both passwords must match." onClose={setWrongConfirm(false)}></LoginModal> : null
const invalidPasswordModal = invalidPassword ? <LoginModal message="The password must be more than 8 characters and include uppercase, lowercase, and numbers" onClose={setInvalidPassword(false)}></LoginModal> : null

  return (
    <Box className="login-page-holder">
      {enterPasscodeModal}
      {newPasswordModal}
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
                <Box>PASSWORD RESET</Box>  
                <Button variant="contained" color="error" fontSize="32px" onClick={handleGoBack}>X</Button>
              </Box>
          </Box>

          <Box className="login-box-mid">
              
            <Box className="login-email-field">
                <Typography>Email</Typography>
                <TextField label="Email" className="login-textfield" variant="filled" onChange={updateField("email")}></TextField>
              </Box>

              <Box className="login-button-holder">
                <Button variant="contained" color="warning" onClick = {handleVerification}>Send Passcode</Button>
              </Box>

              <Box className="login-bottom-text">
              <Typography>Suddenly remember your password?</Typography><Button variant="contained" onClick={handleSignUp}>Sign In</Button>
              </Box>
          </Box>
        </Box>

      </Box>
    </Box>
  );
};


export default PasswordReset;
