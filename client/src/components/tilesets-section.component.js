import React, { Component, useState  } from 'react';
import { List, ListItem,Tabs,Tab} from '@mui/material';
import { Button, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import LayerCard from '../components/layer-card.component';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import ArrowCircleDownTwoToneIcon from '@mui/icons-material/ArrowCircleDownTwoTone';
import ArrowCircleUpTwoToneIcon from '@mui/icons-material/ArrowCircleUpTwoTone';
import Typography from '@mui/material/Typography';
import candles from '../assets/map-card.jpg';
import Tileset from './tileset-cards.component';
import map from '../assets/map-card.jpg'
import { useNavigate } from 'react-router-dom';
import GlobalStoreContext from '../store';
import { useContext } from 'react';
import TilsetAdd from '../components/AddTileset.component'
import { saveAs } from 'file-saver'
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
import TilsetCreateModal from './create-tileset-modal.component'
import LoginModal from './login-modal.component';


const TilesetsSection =()=>{
    const navigate = useNavigate();
    const {store} =useContext(GlobalStoreContext);
    const [value, setValue] = React.useState(0);
    const [btnColor, setBtnColor] = useState("#d72b05");
    const [addTileset, setAddTileset] = useState(false);
    const [open, setOpen] = React.useState(false);   
    const anchorRef = React.useRef(null); 
    
    const [editTilesetT, setEditTilesetT] = useState(false);

    const [wrong, setWrong] = useState(false)
  

    const handleAddTileset = () => {
      setAddTileset(true)
    }
    const handleCloseTilesetModal = () => {
        setAddTileset(false)
    }
    const addTilesetModal = addTileset ? <TilsetAdd onClose={() => handleCloseTilesetModal()}></TilsetAdd> : null;
    

    const handleCloseTilesetModalT = () => {
        setEditTilesetT(false)
    }
    const editTilesetModal_temp = editTilesetT ? <TilsetCreateModal onClose={() => handleCloseTilesetModalT()}></TilsetCreateModal> : null;


    const handleTileEdit = (tileset) => {
        console.log(store.currentTileSet)
        if(store.currentTileSet.name == undefined || tileset.target.id != store.currentTileSet[0].name ) {
            setWrong(true)
            return;
        }
        else {
            navigate("/tileseteditor/" + store.currentMapInfo._id + "/" + store.currentTileSet[0]._id)
        }
        
    }
    const tilesets = store.currentMap.tilesets

    const handleTileSetDisplay = (event)=>{
        event.preventDefault();
        // console.log(event.target.id);
        store.setCurrentTileset(event.target.id);
        btnColor === "#d72b05" ? setBtnColor("green") : setBtnColor("#d72b05");
    };

    const handleToggle = () => {
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

    const handleCreateTileset = () => {
        setEditTilesetT(true)

    } 

    let main = tilesets != undefined ?
    <Tabs
        value={value}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable prevent tabs example"
        sx={{backgroundImage:'linear-gradient(to bottom,#7A7A7B,#7A7A7B)',boxShadow: `inset 0 0 6px rgba(0, 0, 0, 0.3)`,marginLeft:3,marginLeft:3,
        marginRight:3,
        marginTop:2,
        borderRadius:1,
        width:"90%",
        }}
        >
            {tilesets.map((layer) => (
                <Box display='flex' 
                sx={{backgroundImage:'linear-gradient(to top, lightgrey 0%, lightgrey 1%, #e0e0e0 26%, #efefef 48%, #d9d9d9 75%, #bcbcbc 100%)',borderRadius:1,width:"145px",marginRight:1.5}}>
                    
                <Tab 
                    key ={layer._id}
                    sx={{
                    backgroundColor: layer.name == (store.currentTileSet[0] != undefined ? store.currentTileSet[0].name : store.currentTileSet.name) 
                                                                                 ? "#a82037" : {btnColor},
                    width:"4px"}}
                    id={layer._id} 
                    onClick = {handleTileSetDisplay}
                    label={layer.name}
                    >{layer.name}
                </Tab>
                    
                <Button variant="contained"  sx={{backgroundColor:"#d72b05" ,fontSize:12,borderRadius:0,marginLeft:-1 }} id={layer.name} onClick={(layer) => handleTileEdit(layer)}>
                    Edit
                </Button>
                </Box>
            ))}
    </Tabs> 
    
    : null

    let wrongTsModal = wrong ? <LoginModal message="Please select your tileset before you choose to edit it" onClose={() => setWrong(false)}></LoginModal> : null
    
    return(
        <Grid sx={{backgroundImage :'linear-gradient(to left, #505051, #303031)',boxShadow: '0 1px 2px 2px rgba(68,68,69,255)',borderRadius:2}}>
            {addTilesetModal}
            {wrongTsModal}
            {/* TEMP */}
            {editTilesetModal_temp}
            {/* TEMP */}

            <Grid>
                <Box sx={{display:"flex",justifyContent:"space-between"}}>
                    <Typography sx={{color:"white",fontSize:20,fontWeight:"bold",marginTop:2,marginLeft:3}}>TILESETS</Typography>
                    <Button 
                        // onClick={handleAddTileset} 
                        variant="contained" endIcon={<AddCircleTwoToneIcon />}
                        sx={{backgroundColor:"#d72b05",boxShadow: '0 2px 4px 2px rgba(68,68,69,255)',marginRight:3,marginTop:1}}
                        ref={anchorRef}
                        id="composition-button"
                        aria-controls={open ? 'composition-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                        
                        >
                        Add
                    </Button>
                    <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    placement='top'
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
                                        <MenuItem onClick={handleAddTileset}>Import Tileset</MenuItem>  
                                        <MenuItem onClick={handleCreateTileset}>Create Tileset</MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
                </Box>
                {main}
            {store.currentTileSet ? <Tileset/> : null}
            </Grid>
                
        <Grid >
     </Grid>
 </Grid>
    );

}

export default TilesetsSection;