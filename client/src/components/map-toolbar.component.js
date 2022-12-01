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
import map from '../assets/map-card.jpg';
import { uploadImageToCloudinaryAPIMethod } from "../api/cloudinary"
import LoginModal from './login-modal.component';
import SizeSettings from './size-settings.component';


const MapToolBar=() =>{
    const {store} = useContext(GlobalStoreContext);
    const {auth} = useContext(AuthContext)
    const navigate = useNavigate();
    
    const handleGoBack = async () => {
        await auth.getLoggedIn()
        await store.loadUserMaps(auth.user.username)
        await store.setEditActive(store.currentMapInfo._id, false)
        navigate("/projects", {});
    }

    const [open, setOpen] = React.useState(false);    
    const [dialogopen, setDialogOpen] = React.useState(false);
    const [exportMenu, setExportMenu] = useState(false);
    const [settings, setSettings] = useState(false);
    const [teams, setTeams] = useState(false);
    const [publishModalOpen, setPublishModalOpen] = useState(false);
    const anchorRef = React.useRef(null);
    const expoRef = React.useRef(null)
    const [popup, setPopup] = useState(false)
    const [saveConfirm, setSaveConfirm] = useState(false)
    const [sizeSettings, setSizeSettings] = useState(false)

    const handleClickOpen = () => {
        setDialogOpen(true);
    };
  
    const handleDialogClose = () => {
      setDialogOpen(false);
    };

    const handleExportMenu = () => {
        setExportMenu(true);
    }

    const handleExportMenuClose = () => {
        setExportMenu(false);
    }
  
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
    
    const handleExportClose = (event) => {
        if (expoRef.current && expoRef.current.contains(event.target)) {
            return;
        }
        setExportMenu(false);
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

    const handleOpenSizeSettings = async () => {
        setSizeSettings(true)
    }
 
    const handleMapSave = async () => {
        setSaveConfirm(true);
        store.saveCurrentMap()

    }

    const handleCloseTeams = () => {
        setTeams(false)
    }
    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    const expoOpen = React.useRef(exportMenu)
    React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
        anchorRef.current.focus();
        }
        prevOpen.current = open;

        expoOpen.current = exportMenu;
    }, [open, exportMenu]);
    
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

    const exportAsJSONPopup = () => {
        setPopup(true)
    }

    //need to figure out how to export as png
    const exportAsJSON = async () => {
        setPopup(false)
        let mapData = store.currentMap 
        mapData.tilesets[0].image = "map-card-7.jpg"
        mapData.tilesets[0].source = null
        mapData.tilesets[0].margin = 0
        mapData.tilewidth = 64;
        mapData.tileheight = 64;

        // create file in browser
        const fileName = store.currentMapInfo.name;
        const json = JSON.stringify(mapData, null, 2);
        const blob = new Blob([json], { type: "application/json" });
        const href = URL.createObjectURL(blob);

        // create "a" HTLM element with href to file
        const link = document.createElement("a");
        link.href = href;
        link.download = fileName + ".json";
        document.body.appendChild(link);
        link.click();

        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link);
        URL.revokeObjectURL(href); 


        /*const link1 = document.createElement("a");
        const fileName1 = store.currentMapInfo.name + "-tileset";
        const blob1 = new Blob([], { type: "image/jpg;base64" });
        const href1 = URL.createObjectURL(blob1);

        link1.href = href1;
        link1.download = fileName1 + ".jpg";
        document.body.appendChild(link1);
        link1.click();

        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link1);
        URL.revokeObjectURL(href1); */
    }

    const handleStampClick = (event) =>{
        store.setCurrentMapEditingTool("stamp");
    }

    const handlePaintClick = (event) =>{
        store.setCurrentMapEditingTool("paint");
    }

    const handleEraserClick = (event) =>{
        store.setCurrentMapEditingTool("eraser");
    }

    const handleUndo = (event) => {
        store.undoUserEdit();
    }

    const handleRedo = (event) => {
        store.redoUserEdit();
    }

    let exportDropDown = 
        <Popper
        sx={{paddingRight:"15%"}}
        open={exportMenu}
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
                    <ClickAwayListener onClickAway={handleExportMenuClose}>
                        <MenuList
                            autoFocusItem={exportMenu}
                            id="composition-menu"
                            aria-labelledby="composition-button"
                        >
                            {/* add settings to the settings menu-bar here  */}
                            <MenuItem onClick={() => exportAsJSONPopup()}>As JSON</MenuItem>   
                        </MenuList>
                    </ClickAwayListener>
                </Paper>
            </Grow>
        )}
    </Popper>

    let stampColor = store.selectedMapEditTool == "stamp" ? "red" : ""
    let paintColor = store.selectedMapEditTool == "paint" ? "red" : ""
    let eraseColor = store.selectedMapEditTool == "eraser" ? "red" : ""

    let popupMessage = "Here's how to export your map into a program like Tiled! \n When you click the download button below, you will be downloading the JSON map file, as well as your tileset images.\n " +
    "When you import your map into Tiled, make sure your JSON file and tileset images are in the same folder.\n It's as simple as that!"

    let popupModal = popup ? <LoginModal message = {popupMessage} onClose = {() => exportAsJSON()} closeButtonText = "Download" onClose2={() => setPopup(false)}></LoginModal> : null

    let saveConfirmModal = saveConfirm ? <LoginModal message="Successfully saved!" onClose={() => setSaveConfirm(false)}></LoginModal> : null

    let sizeSettingsModal = sizeSettings ? <SizeSettings onClose = {() => setSizeSettings(false)}></SizeSettings> : null

    return (
        
        <Box className='top-navbar' sx={{ display: 'flex' ,flexGrow: 1,}} >
            {[settingsModal, deleteModalBox, publishModal, teamsModal, popupModal, saveConfirmModal, sizeSettingsModal]}

           <AppBar position="static" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1}}>
              <Toolbar sx={{boxShadow: 1 ,backgroundColor:'#1E1E1E',boxShadow: '0 1px 1px 1px rgba(68,68,69,255)',justifyContent: 'space-between'}}> 
            <Box>
                <Button onClick={handleTeamsModal} sx = {{backgroundImage: 'linear-gradient(to right,#a51916,#F83600)',borderRadius:'10px',color:"white",fontWeight:"bold",marginX:1}}>
                    Manage Team
                </Button>

               <IconButton key={1} aria-label="undo" onClick={() => handleUndo()}>
                <UndoIcon sx={{fill:"white" ,fontSize:40}}/>
                </IconButton>

                <IconButton id={2} ariaLabel="redo" onClick={() => handleRedo()} >
                <RedoTwoToneIcon sx={{fill:"white" ,fontSize:40}}/>
                </IconButton>

                <IconButton key={3} aria-label="stamp" onClick ={handleStampClick}>
                <ApprovalTwoToneIcon sx={{fill:"white", backgroundColor:stampColor , borderRadius:2, fontSize:40}}/>
                </IconButton>

                <IconButton key={4} aria-label="paint" onClick={handlePaintClick}>
                <FormatColorFillTwoToneIcon sx={{fill:"white", backgroundColor:paintColor , borderRadius:2, fontSize:40}}/>
                </IconButton>

                <IconButton key={5} aria-label="delete" onClick={handleEraserClick}>
                <AutoFixNormalSharpIcon sx={{fill:"white", backgroundColor:eraseColor , borderRadius:2, fontSize:40}}/>
                </IconButton>
            </Box>
            <Box >
                <Button onClick={() => handleExportMenu()} sx = {{backgroundImage: 'linear-gradient(to right,#a51916,#F83600)',borderRadius:'10px',color:"white",fontWeight:"bold",fontSize:15,marginX:1}}>
                    Export
                </Button>
                
                {exportDropDown}


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
                                        <MenuItem onClick={handleOpenSettings}>Update Map Info</MenuItem>  
                                        <MenuItem variant="contained" component="label"> 
                                        Change Map thumbnail
                                        <input hidden accept="image/*" multiple type="file" onChange={handleChangeThumbnail} />
                                        </MenuItem> 
                                        <MenuItem onClick={handleOpenSizeSettings}>Update Tile/Map Size</MenuItem> 
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
