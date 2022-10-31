import React from 'react';
import { Button, Grid } from '@mui/material';
import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import "../App.css"
import AuthContext from '../auth';
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField';


function AccountSettings() {
    const { store } = useContext(GlobalStoreContext);
    const {auth} = useContext(AuthContext);
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

    
    return(
        <div className='account_setting'>
            <div>
                <h1 id='account_setting_title'>Account Settings</h1>
            </div>
            <div className='form-area'>
                <h2 id='change-text'>Change Profile Picture</h2>
                <div id="edit2">
                    <div>
                    <img className="profile-image" src="https://res.cloudinary.com/natialemu47/image/upload/v1667096181/Tileslate/userimage_mesvde.png" alt="Profile-image" />
                    <h5 id ='profile-name'>USERNAME</h5>
                    <h6 id = 'profile-email'>user@gmail.com</h6>
                    </div>
                    <span><Button variant="contained" className='button-color' component="label" size="large">
                            Choose new image
                            <input hidden accept="image/*" multiple type="file" />
                        </Button>
                    </span>
                    <span><Button variant="outlined" color="error" size="large">Remove Profile Picture</Button></span>
    
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
                    
                    />
                    
                    
                </div>
                <div id='accountSetting-button'>
                    
                    <Button variant="contained" component="label" size="large" className='button-color'>Save Changes</Button>
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

                    />
                    </span>
                </div>
                <div id='accountSetting-button'>
                    <Button variant="contained" component="label" size="large" className='button-color'>Save Changes</Button>
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

                />

                <div id='accountSetting-button'>
                    <Button variant="contained" component="label" size="large" className='button-color'>Save Changes</Button>
                </div>
                

            </div>

            <div className='form-area'>
                <h2 id='change-text'>Change Password</h2>
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
                        Include numbers Inclue upper
                        <br/>
                        lower case characters
                    </>
                }
                sx = {{borderColor: 'white'}}
                className = "text-field"
                
                
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
                
                />
                </span>
                </div>  
                <div id='accountSetting-button'>
                    <Button variant="contained" component="label" size="large" className='button-color'>Save Changes</Button>
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
                <Checkbox {...label} sx={{color: 'white'}} />
                <span style={{color: "white"}}> I have read and understood the consequences of deleting my account</span>

                </div>
                <div id='accountSetting-button-2' >
                    <Button variant="outlined" color="error" size="large">Delete Account</Button>
                </div>
        
                
            </div>
        
        </div>
    );
}

export default AccountSettings;