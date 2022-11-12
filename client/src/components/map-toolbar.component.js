import '../App.css';
import "../App"
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../auth';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import UndoIcon from '@mui/icons-material/Undo';
import RedoTwoToneIcon from '@mui/icons-material/RedoTwoTone';
import ApprovalTwoToneIcon from '@mui/icons-material/ApprovalTwoTone';
import FormatColorFillTwoToneIcon from '@mui/icons-material/FormatColorFillTwoTone';
import AutoFixNormalSharpIcon from '@mui/icons-material/AutoFixNormalSharp';
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import { GlobalStoreContext } from '../store'
import * as React from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { compareSync } from 'bcryptjs';




const MapToolBar=() =>{
    const { store } = useContext(GlobalStoreContext);
    const {auth} = useContext(AuthContext);
    const navigate = useNavigate();
    const handleGoBack = async () => {
        await auth.getLoggedIn()
        await store.loadUserMaps(auth.user.username)
        navigate("/projects", {});
    }

    const [open, setOpen] = React.useState(false);    
    const [dialogopen, setDialogOpen] = React.useState(false);
    
    const anchorRef = React.useRef(null);

    const handleClickOpen = () => {
        setDialogOpen(true);
    };
  
    const handleDialogClose = () => {
      setDialogOpen(false);
    };
  

    const handleToggle = () => {
        console.log(store.currentMap)
        console.log(auth.user)
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }
    
    const handleDeleteMap = async () => {
        // console.log(store.userMaps)
        // console.log(auth.user)
        // console.log(store.currentMap)
        console.log(auth.user)
        let userData = {
            username: auth.user.username,
            _id: auth.user._id,
            email: auth.user.email, 
            first_name: auth.user.first_name,
            last_name: auth.user.last_name, 
            myprojects: auth.user.myprojects.filter(mapinfo => mapinfo !== store.currentMap.mapinfo), 
            liked_projects: auth.user.liked_projects, 
            profile_picture: auth.user.profile_picture,
            publishedMaps: auth.user.publishedMaps
        }
        
        await store.deleteMap(store.currentMap._id)
        await auth.updateUser(userData)
        handleGoBack()
    }
 
    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
        anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);

    const deleteModalBox = 
        <Dialog
            open={dialogopen}
            onClose={handleDialogClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            {"Delete Map?"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete? Map will be permanently Deleted
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleDialogClose}>No</Button>
            <Button onClick={handleDeleteMap} autoFocus>
                Yes
            </Button>
            </DialogActions>
        </Dialog>

    return (
        
        <Box className='top-navbar' sx={{ display: 'flex' ,flexGrow: 1,}} >
            {deleteModalBox}

           <AppBar position="static" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1}}>
              <Toolbar sx={{boxShadow: 1 ,backgroundColor:'#1E1E1E',boxShadow: '0 1px 1px 1px rgba(68,68,69,255)',justifyContent: 'space-between'}}> 
            <Box>
                <Button sx = {{backgroundImage: 'linear-gradient(to right,#a51916,#F83600)',borderRadius:'10px',color:"white",fontWeight:"bold",marginX:1}}>
                    Manage Team
                </Button>

               <IconButton aria-label="undo">
                <UndoIcon sx={{fill:"white" ,fontSize:40}}/>
                </IconButton>

                <IconButton aria-label="redo">
                <RedoTwoToneIcon sx={{fill:"white" ,fontSize:40}}/>
                </IconButton>

                <IconButton aria-label="stamp">
                <ApprovalTwoToneIcon sx={{fill:"white" ,fontSize:40}}/>
                </IconButton>

                <IconButton aria-label="paint">
                <FormatColorFillTwoToneIcon sx={{fill:"white" ,fontSize:40}}/>
                </IconButton>

                <IconButton aria-label="delete">
                <AutoFixNormalSharpIcon sx={{fill:"white" ,fontSize:40}}/>
                </IconButton>
            </Box>
            <Box >
                <Button sx = {{backgroundImage: 'linear-gradient(to right,#a51916,#F83600)',borderRadius:'10px',color:"white",fontWeight:"bold",fontSize:15,marginX:1}}>
                    Export
                </Button>

                <Button sx = {{backgroundImage: 'linear-gradient(to right,#fa5a01,#fe9f05)',borderRadius:'10px',color:"white",fontWeight:"bold",fontSize:15,marginX:1}}>
                    Save 
                </Button>

                <Button sx = {{backgroundImage: 'linear-gradient(to right,#fda204,#ffc406)',borderRadius:'10px',color:"white",fontWeight:"bold",fontSize:15,marginX:1}}>
                    Publish
                </Button>

               
                <IconButton aria-label="settings"
                    ref={anchorRef}
                    id="composition-button"
                    aria-controls={open ? 'composition-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                >
                     <SettingsTwoToneIcon sx={{fill:"#C0C0C0" ,fontSize:40}}/> 
                </IconButton>
                <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    placement="bottom-start"
                    transition
                    disablePortal
                >
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin:
                                placement === 'bottom-start' ? 'left top' : 'left bottom',
                            }}
                            >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList
                                        autoFocusItem={open}
                                        id="composition-menu"
                                        aria-labelledby="composition-button"
                                        onKeyDown={handleListKeyDown}
                                    >
                                        {/* add settings to the settings menu-bar here  */}
                                        <MenuItem onClick={handleClose}>random map settings</MenuItem>    
                                        <MenuItem onClick={handleClose}>random map settings2</MenuItem>  
                                        <MenuItem onClick={handleClickOpen}>Delete Map</MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
               

                <IconButton aria-label="close" onClick={handleGoBack}>
                <CancelTwoToneIcon sx={{fill:"#C0C0C0" ,fontSize:40}}/>
                </IconButton>
                
            </Box>
            </Toolbar>
           </AppBar>
        </Box>
    );
  }

  export default MapToolBar;