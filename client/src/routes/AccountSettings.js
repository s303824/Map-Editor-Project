import React, { createContext, useEffect, useState } from "react";
import { Button, Grid } from '@mui/material';
import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import "../App.css"
import AuthContext from '../auth';
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField';
import LoginModal from "../components/login-modal.component";
import { uploadImageToCloudinaryAPIMethod } from "../api/cloudinary"

function AccountSettings() {
    const { store } = useContext(GlobalStoreContext);
    const {auth} = useContext(AuthContext);
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
    const [modalActive, setModalActive] = React.useState(false);
    const [passwordModal, setPasswordModal] = React.useState(false);

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [currentPassword, setCurrentPassword] = useState("")
    const [password, setPassword] = useState("")
    const [passwordVerify, setPasswordVerify] = useState("")
    const [checked, setChecked] = useState(false);

    const default_image = "https://res.cloudinary.com/natialemu47/image/upload/v1652196653/dnt17uj4nl9ywfq648v8.jpg";

    const handleModalClose = () => {
        setModalActive(false)
    }
    const handlePasswordModalClose = () => {
        setPasswordModal(false)
    }
    const modal = modalActive ? <LoginModal message= "Enter the required field first!" onClose={handleModalClose}> </LoginModal>: null;
    const delete_modal = passwordModal ? <LoginModal message = "Passwords do not match!" onClose={handlePasswordModalClose}></LoginModal>: null;
    
    const handleChangeUsername = () => {
        if (username === ""){
            setModalActive(true)
            return;
        }
        let userData = {
            username: username,
            id: auth.user._id,
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
    const handleNameChange = () => {
        if (firstName === "" && lastName===""){
            setModalActive(true)
            return;
        }
        let userData = {
            username: auth.user.username,
            id: auth.user._id,
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
    const handleEmailChange = () => {
        if (email === ""){
            setModalActive(true)
            return;
        }
        let userData = {
            username: auth.user.username,
            id: auth.user._id,
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
    const handlePasswordChange = () => {
        if (currentPassword === "" && password === "" && passwordVerify === "" ){
            setModalActive(true)
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
    const handleDeleteAccount = () => {
        if (checked === false){
            setModalActive(true)
            return;
        }

        auth.deleteUser(auth.user._id)

    }
    const handleCheckBox = (event) => {
        setChecked(event.target.checked);
      };

    const handleImageSelected = (event) => {
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
                // const updatedUser = {... profile_picture, image: response.url};
                // setProfilePicture(response.url);
             
                let userData = {
                    username: auth.user.username,
                    id: auth.user._id,
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


    const handleRemoveProfilePicture = () => {
        let userData = {
            username: auth.user.username,
            id: auth.user._id,
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
            <div>
                <h1 id='account_setting_title'>Account Settings</h1>
            </div>
            
            <div className='form-area'>
                <h2 id='change-text'>Change Profile Picture</h2>
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
                    <span><Button variant="outlined" color="error" size="large" onClick = {handleRemoveProfilePicture}>
                        Remove Profile Picture
                        </Button>
                    </span>
    
                </div>
            </div>
            
            <div className='form-area'>
                <h2 id='change-text'>Change Username</h2>
                <div>
                    <h4 style={{color: "#ffffff"}}>Enter a new user name</h4>
                    <TextField
                    required
                    id="outlined-required"
                    label="Required"
                    defaultValue=""
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
                <h4 style={{color: "#ffffff"}}>Enter a new name</h4>
                <div style={{"justifyContent": "space-between", "display": "flex", "margin-right": "30%"}}> 
                    <span>
                    <TextField
                    required
                    id="outlined-required"
                    label="First Name"
                    defaultValue=""
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
                <h4 style={{color: "#ffffff"}}>Enter a new Email Address</h4>
                    <TextField
                    required
                    id="outlined-required"
                    label="Required"
                    defaultValue=""
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

                <div>
                <h4 id='change-text'>Enter Current Password</h4>
                <TextField
                    required
                    id="outlined-password-input"
                    label="Current Password"
                    type="password"
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
                    <Button variant="outlined" color="error" size="large" onClick={handleDeleteAccount}>
                        Delete Account
                    </Button>
                </div>
        
                
            </div>
        
        </div>
    );
}

export default AccountSettings;