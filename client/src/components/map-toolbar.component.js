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
import ManageTeam from './manage-team.component';
import MapSettings from './map-settings.component';
import PublishMap from './publish.component';
import { uploadImageToCloudinaryAPIMethod } from "../api/cloudinary"


const MapToolBar=() =>{
    const {store} = useContext(GlobalStoreContext);
    const {auth} = useContext(AuthContext)
    const navigate = useNavigate();
    const handleGoBack = async () => {
        store.setEditActive(store.currentMapInfo, false)
        await auth.getLoggedIn()
        await store.loadUserMaps(auth.user.username)
        navigate("/projects", {});
    }

    const [open, setOpen] = React.useState(false);    
    const [dialogopen, setDialogOpen] = React.useState(false);
    const [settings, setSettings] = useState(false);
    const [teams, setTeams] = useState(false);
    const [publishModalOpen, setPublishModalOpen] = useState(false);
    const anchorRef = React.useRef(null);

    const handleClickOpen = () => {
        setDialogOpen(true);
    };
  
    const handleDialogClose = () => {
      setDialogOpen(false);
    };
  
    const handleChangeThumbnail = (event) => {
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
                const thumbnailUrl = response.url
                
                store.updateMapInfoUrl(thumbnailUrl)

            });
        }

    }

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const handleOpenSettings = () => {
        setSettings(true)
        setOpen(false)
    }

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    const handlePublishModal = async () => {
        setPublishModalOpen(true)
    }

    const handleTeamsModal = async () => {
        setTeams(true)
    }

    const handleDeleteMap = async () => {
        await store.deleteMap(store.currentMap._id)
        handleGoBack()
    }
 
    const handleMapSave = async () => {
        console.log(store.currentMap)
        store.saveCurrentMap()

    }

    const handleCloseTeams = () => {
        setTeams(false)
    }
    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
        anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);
    
    const settingsModal = settings ? <MapSettings  onClose={() => setSettings(false)}></MapSettings> : null;
    const publishModal = publishModalOpen ? <PublishMap onClose={() => setPublishModalOpen(false)}></PublishMap> : null;
    const teamsModal = teams ? <ManageTeam onClose={() => handleCloseTeams()}></ManageTeam> : null;
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
                Are you sure you want to delete? This map will be permanently deleted.
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button key={1} onClick={handleDialogClose}>No</Button>
            <Button key={2} onClick={handleDeleteMap} autoFocus>
                Yes
            </Button>
            </DialogActions>
        </Dialog>

    const handleStampClick = (event) =>{
        store.setCurrentMapEditingTool("stamp");
    }

    const handlePaintClick = (event) =>{
        store.setCurrentMapEditingTool("paint");
    }

    const handleEraserClick = (event) =>{
        store.setCurrentMapEditingTool("eraser");
    }

    return (
        
        <Box className='top-navbar' sx={{ display: 'flex' ,flexGrow: 1,}} >
            {[settingsModal, deleteModalBox, publishModal, teamsModal]}

           <AppBar position="static" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1}}>
              <Toolbar sx={{boxShadow: 1 ,backgroundColor:'#1E1E1E',boxShadow: '0 1px 1px 1px rgba(68,68,69,255)',justifyContent: 'space-between'}}> 
            <Box>
                <Button onClick={handleTeamsModal} sx = {{backgroundImage: 'linear-gradient(to right,#a51916,#F83600)',borderRadius:'10px',color:"white",fontWeight:"bold",marginX:1}}>
                    Manage Team
                </Button>

               <IconButton key={1} aria-label="undo">
                <UndoIcon sx={{fill:"white" ,fontSize:40}}/>
                </IconButton>

                <IconButton id={2} ariaLabel="redo" >
                <RedoTwoToneIcon sx={{fill:"white" ,fontSize:40}}/>
                </IconButton>

                <IconButton key={3} aria-label="stamp" onClick ={handleStampClick}>
                <ApprovalTwoToneIcon sx={{fill:"white" ,fontSize:40}}/>
                </IconButton>

                <IconButton key={4} aria-label="paint" onClick={handlePaintClick}>
                <FormatColorFillTwoToneIcon sx={{fill:"white" ,fontSize:40}}/>
                </IconButton>

                <IconButton key={5} aria-label="delete" onClick={handleEraserClick}>
                <AutoFixNormalSharpIcon sx={{fill:"white" ,fontSize:40}}/>
                </IconButton>
            </Box>
            <Box >
                <Button sx = {{backgroundImage: 'linear-gradient(to right,#a51916,#F83600)',borderRadius:'10px',color:"white",fontWeight:"bold",fontSize:15,marginX:1}}>
                    Export
                </Button>

                <Button sx = {{backgroundImage: 'linear-gradient(to right,#fa5a01,#fe9f05)',borderRadius:'10px',color:"white",fontWeight:"bold",fontSize:15,marginX:1}} onClick = {handleMapSave} >
                    Save 
                </Button>

                <Button onClick={handlePublishModal} sx = {{backgroundImage: 'linear-gradient(to right,#fda204,#ffc406)',borderRadius:'10px',color:"white",fontWeight:"bold",fontSize:15,marginX:1}}>
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
                                        <MenuItem onClick={handleOpenSettings}>Update Map Settings</MenuItem>   
                                        <MenuItem variant="contained" component="label"> 
                                        Change Map thumbnail
                                        <input hidden accept="image/*" multiple type="file" onChange={handleChangeThumbnail} />
                                        </MenuItem> 
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
