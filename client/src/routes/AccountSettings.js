import React, { createContext, useEffect, useState } from "react";
import { Button, Grid } from '@mui/material';
import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import "../App.css"
import AuthContext from '../auth';
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from '@mui/material/Divider';
import LoginModal from "../components/login-modal.component";
import { uploadImageToCloudinaryAPIMethod } from "../api/cloudinary"

function AccountSettings() {
    const { store } = useContext(GlobalStoreContext);
    const {auth} = useContext(AuthContext);
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
    const [modalActive, setModalActive] = React.useState(false);                 // Modal for when the user trys to update account info without an inputs
    const [passwordModal, setPasswordModal] = React.useState(false);             // Modal for checking if password & Verify password match
    const [passwordFormatModal, setPasswordFormatModal] = React.useState(false); // For checking if password format is correct
    const [emailModal, setEmailModal] = React.useState(false);                   // For checking if email format is correct       

    const [firstName, setFirstName] = useState("")                               // For first name input field 
    const [lastName, setLastName] = useState("")                                 // For last name input field 
    const [username, setUsername] = useState("")                                 // For username input filed
    const [email, setEmail] = useState("")                                       // For email input field
    const [currentPassword, setCurrentPassword] = useState("")                   // For current password input field 
    const [password, setPassword] = useState("")                                 // For password input field
    const [passwordVerify, setPasswordVerify] = useState("")                     // For password verify input field 
    const [checked, setChecked] = useState(false);                               // For checking if user agreed to conditions before deleting account


    const default_image = "https://res.cloudinary.com/natialemu47/image/upload/v1652196653/dnt17uj4nl9ywfq648v8.jpg";

    const handleModalClose = () => {   // For closing modal
        setModalActive(false)
    }
    const handlePasswordModalClose = () => {  // For closing modal
        setPasswordModal(false)
    }
    const handleEmailModalClose = () => {  // For closing modal
        setEmailModal(false)
      }
    const handlePasswordFormatModalClose = () => { // For closing modal
        setPasswordFormatModal(false)
    }
    const password_Format_modal = passwordFormatModal ? <LoginModal message = "Password should have at least 1 lower, 1 upper case and 1 number. Password should also be longer than 8 characters!" onClose={handlePasswordFormatModalClose}></LoginModal>: null;
    const email_modal = emailModal ? <LoginModal message = "Email is invalid!" onClose={handleEmailModalClose}></LoginModal>: null;
  
    const modal = modalActive ? <LoginModal message= "Enter the required field first!" onClose={handleModalClose}> </LoginModal>: null;
    const delete_modal = passwordModal ? <LoginModal message = "Passwords do not match!" onClose={handlePasswordModalClose}></LoginModal>: null;
    
    const handleChangeUsername = () => {  // handles request for changing user name 
        if (username === ""){
            setModalActive(true)
            return;
        }
        let userData = {
            username: username,
            _id: auth.user._id,
            email: auth.user.email, 
            first_name: auth.user.first_name,
            last_name: auth.user.last_name, 
            myprojects: auth.user.myprojects, 
            liked_projects: auth.user.liked_projects, 
            profile_picture: auth.user.profile_picture,
            publishedMaps: auth.user.publishedMaps
          }
          auth.setNewUserInfo(userData)
    }
    const handleNameChange = () => {    // handles request for changing name 
        if (firstName === "" && lastName===""){
            setModalActive(true)
            return;
        }
        let userData = {
            username: auth.user.username,
            _id: auth.user._id,
            email: auth.user.email, 
            first_name: firstName,
            last_name: lastName, 
            myprojects: auth.user.myprojects, 
            liked_projects: auth.user.liked_projects, 
            profile_picture: auth.user.profile_picture,
            publishedMaps: auth.user.publishedMaps
          }
          auth.setNewUserInfo(userData)

    }
    const handleEmailChange = () => { // handles request for changing Email address 
        let mail_format = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (email === ""){
            setModalActive(true)
            return;
        }
        
        if (!mail_format.test(email)) {
          setEmailModal(true)
          return;
        }
        let userData = {
            username: auth.user.username,
            _id: auth.user._id,
            email: email, 
            first_name: auth.user.first_name,
            last_name: auth.user.last_name, 
            myprojects: auth.user.myprojects, 
            liked_projects: auth.user.liked_projects, 
            profile_picture: auth.user.profile_picture,
            publishedMaps: auth.user.publishedMaps
          }
          auth.setNewUserInfo(userData)

    }
    const handlePasswordChange = () => {        // handles request for changing Password
        let password_format = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).{8,}/;
        if (currentPassword === "" && password === "" && passwordVerify === "" ){
            setModalActive(true)
            return;
        }
        if (!password_format.test(password)) {
            setPasswordFormatModal(true)
            return;
        }
        if (password !== passwordVerify){
            setPasswordModal(true)
            return;
        }
        let userData = {
            id: auth.user._id,
            currentPassword: currentPassword,
            password: password,
            passwordVerify: passwordVerify,
          }
          auth.setNewPassword(userData)


    }
    const handleDeleteAccount = () => {         // handles request for Deleting account  
        if (checked === false){
            setModalActive(true)
            return;
        }

        auth.deleteUser(auth.user._id)

    }
    const handleCheckBox = (event) => {             // Checks if checkbox is checked before deleting account 
        setChecked(event.target.checked);
      };

    const handleImageSelected = (event) => {        // handles request for changing the profile picture of the user
        console.log("New File Selected");
        if (event.target.files && event.target.files[0]) {
      
            // Could also do additional error checking on the file type, if we wanted
            // to only allow certain types of files.
            const selectedFile = event.target.files[0];
            console.dir(selectedFile);
      
            const formData = new FormData();
            // TODO: You need to create an "unsigned" upload preset on your Cloudinary account
            // Then enter the text for that here.
            const unsignedUploadPreset = 'mftlkxf6'
            formData.append('file', selectedFile);
            formData.append('upload_preset', unsignedUploadPreset);
      
            console.log("Cloudinary upload");
            uploadImageToCloudinaryAPIMethod(formData)
            .then((response) => {
                console.log("Upload success");
                console.dir(response);
                console.log(response.url)
                // Now the URL gets saved to the author
             
                let userData = {
                    username: auth.user.username,
                    _id: auth.user._id,
                    email: auth.user.email, 
                    first_name: auth.user.first_name,
                    last_name: auth.user.last_name, 
                    myprojects: auth.user.myprojects, 
                    liked_projects: auth.user.liked_projects, 
                    profile_picture: response.url,
                    publishedMaps: auth.user.publishedMaps
                }
                
                // Now we want to make sure this is updated on the server – either the
                // user needs to click the submit button, or we could trigger the server call here
                auth.setNewUserInfo(userData)

            });
        }

    }


    const handleRemoveProfilePicture = () => {      // handles request for removing the profile picture of the user
        let userData = {
            username: auth.user.username,
            _id: auth.user._id,
            email: auth.user.email, 
            first_name: auth.user.first_name,
            last_name: auth.user.last_name, 
            myprojects: auth.user.myprojects, 
            liked_projects: auth.user.liked_projects, 
            profile_picture: default_image,
            publishedMaps: auth.user.publishedMaps
        }
        auth.setNewUserInfo(userData)

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
          
          case "currentPassword":
            setCurrentPassword(event.target.value)
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
  

    
    return(
        <div className='account_setting'>
            {modal}
            {delete_modal}
            {password_Format_modal}
            {email_modal}

            <div>
                <h1 id='account_setting_title'>Account Settings</h1>
            </div>
            
            <div className='form-area'>
                <h2 id='change-text'>Change Profile Picture</h2>

                <Divider variant="middle" sx={{borderBottomWidth: 4, "border-color": 'white', "margin-bottom": "2%"}}/>
                
                <div id="edit2">
                    <div>
                    {auth.loggedIn && <img className="profile-image" src={auth.user.profile_picture} alt="Profile-image" />}
                    {auth.loggedIn && <h5 id ='profile-name'>{auth.user.username}</h5>}
                    {auth.loggedIn && <h6 id = 'profile-email'>{auth.user.email}</h6>}
                    </div>
                    <span><Button variant="contained" className='button-color' component="label" size="large">
                            Choose new image
                            <input hidden accept="image/*" multiple type="file" onChange={handleImageSelected} />
                        </Button>
                    </span>
                    <span><Button variant="outlined" color="error" size="large" startIcon={<DeleteIcon />} onClick = {handleRemoveProfilePicture}>
                        Remove Profile Picture
                        </Button>
                    </span>
    
                </div>
            </div>
            
            <div className='form-area'>
                <h2 id='change-text'>Change Username</h2>

                <Divider variant="middle" sx={{borderBottomWidth: 4, "border-color": 'white', "margin-bottom": "2%"}}/>

                <div>
                    <h4 style={{color: "#ffffff"}}>Enter a new user name</h4>
                    <TextField
                    required
                    id="outlined-required"
                    label="Required"
                    defaultValue=""
                    variant="filled"
                    helperText="Enter a unique username"
                    color="info"
                    sx={{color: 'white'}}
                    className = "text-field"
                    
                    onChange= {(event) => updateField(event, "username")}
                    
                    
                    />  
                </div>

                <div id='accountSetting-button'>
                    <Button variant="contained" component="label" size="large" className='button-color' onClick = {handleChangeUsername}>
                        Save Changes
                    </Button>
                </div>
            </div>
            
            <div className='form-area'>
                <h2 id='change-text'>Change Name</h2>

                <Divider variant="middle" sx={{borderBottomWidth: 4, "border-color": 'white', "margin-bottom": "2%"}}/>

                <h4 style={{color: "#ffffff"}}>Enter a new name</h4>
                <div style={{"justifyContent": "space-between", "display": "flex", "margin-right": "30%"}}> 
                    <span>
                    <TextField
                    required
                    id="outlined-required"
                    label="First Name"
                    defaultValue=""
                    variant="filled"
                    color="info"
                    sx={{color: 'white'}}
                    className = "text-field"
                    onChange={(event) => updateField(event, "firstName")}
                    
                    
                    />
                    </span>
                    <span>
                    <TextField
                    required
                    id="outlined-required"
                    label="Last Name"
                    defaultValue=""
                    variant="filled"
                    color="info"
                    sx={{color: 'white'}}
                    className = "text-field"
                    onChange={(event) => updateField(event, "lastName")}
                    
                    

                    />
                    </span>
                </div>
                <div id='accountSetting-button'>
                    <Button variant="contained" component="label" size="large" className='button-color' onClick={handleNameChange}>
                        Save Changes
                    </Button>
                </div>
                
            </div>
            
            <div className='form-area'>
                <h2 id='change-text'>Change Email Address</h2>

                <Divider variant="middle" sx={{borderBottomWidth: 4, "border-color": 'white', "margin-bottom": "2%"}}/>

                <h4 style={{color: "#ffffff"}}>Enter a new Email Address</h4>
                    <TextField
                    required
                    id="outlined-required"
                    label="Required"
                    defaultValue=""
                    variant="filled"
                    helperText="Enter a unique email address"
                    color="info"
                    sx={{color: 'white'}}
                    className = "text-field"
                    onChange={(event) => updateField(event, "email")}
                    
                    

                />

                <div id='accountSetting-button'>
                    <Button variant="contained" component="label" size="large" className='button-color' onClick = {handleEmailChange}>
                        Save Changes
                    </Button>
                </div>
            </div>

            <div className='form-area'>
                <h2 id='change-text'>Change Password</h2>

                <Divider variant="middle" sx={{borderBottomWidth: 4, "border-color": 'white', "margin-bottom": "2%"}}/>

                <div>
                <h4 id='change-text'>Enter Current Password</h4>
                <TextField
                    required
                    id="outlined-password-input"
                    label="Current Password"
                    type="password"
                    variant="filled"
                    autoComplete="current-password"
                    className = "text-field"
                    onChange={(event) => updateField(event, "currentPassword")}
                    
                    />
                </div>
                <h4 style={{color: "#ffffff"}}>Enter a new Password</h4>

                <div style={{"justifyContent": "space-between", "display": "flex", "margin-right": "30%"}}> 
                <span>
                <TextField
                required
                id="outlined-password-input"
                label="Password"
                type="password"
                variant="filled"
                autoComplete="current-password"
                helperText={
                    <>
                        Must be more than 8 characters
                        <br />
                        Inclue special characters
                        <br />
                        Include numbers 
                        <br/>
                        Inclue upper/lower case characters
                    </>
                }
                sx = {{borderColor: 'white'}}
                className = "text-field"
                onChange={(event) => updateField(event, "password")}
                
                
                
                />
                </span>
                <span>
                <TextField
                required
                id="outlined-password-input"
                label="Confirm Password"
                type="password"
                variant="filled"
                autoComplete="current-password"
                className = "text-field"
                onChange={(event) => updateField(event, "passwordVerify")}
        
                
                />
                </span>
                </div>  
                <div id='accountSetting-button'>
                    <Button variant="contained" component="label" size="large" className='button-color' onClick={handlePasswordChange}>
                        Save Changes
                    </Button>
                </div>
                
                
            </div>
            <div className='form-area'>
                <h2 id='change-text'>Delete account</h2>

                <Divider variant="middle" sx={{borderBottomWidth: 4, "border-color": 'white', "margin-bottom": "2%"}}/>

                <h4 style={{"margin-top": "0px",
                            "margin-bottom": "0px",
                            color: "#ffffff"}}>
                    If you delete your account please keep the following in mind:
                </h4>
                <ul style={{margin: "0px 0px 0px 0px",
                            color: "#ffffff"}}>
                    <li>your profile will be permanently deleted, including all the maps you created and shared</li>
                </ul>
                <div>
                <Checkbox {...label} sx={{color: 'white'}} onChange={handleCheckBox} checked={checked}/>
                <span style={{color: "white"}}> I have read and understood the consequences of deleting my account</span>

                </div>
                <div id='accountSetting-button-2' >
                    <Button variant="outlined" color="error" size="large" startIcon={<DeleteIcon />} onClick={handleDeleteAccount}>
                        Delete Account
                    </Button>
                </div>
        
                
            </div>
        
        </div>
    );
}

export default AccountSettings;