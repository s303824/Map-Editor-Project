import '../App.css';
import "../App"
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../auth';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import CancelIcon from '@mui/icons-material/Cancel';
import GlobalStoreContext from '../store';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import {Cloudinary} from "@cloudinary/url-gen";
import {AdvancedImage} from '@cloudinary/react';
import {fill} from "@cloudinary/url-gen/actions/resize";
import { Navigate, useNavigate } from 'react-router-dom'

const TilsetCreateModal = ({onClose}) => {
    const {store} = useContext(GlobalStoreContext)
    const {auth} = useContext(AuthContext)
    const navigate= useNavigate();

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
              

    const [imageHeight, setImageHeight] = useState("")
    const [imageWidth, setImageWidth] = useState("")
    const [tileName, setTileName] = useState("")
    const [successful, setSuccessful] = useState(false)
    const [message, setMessage] = useState("")


    const addImageWidth = (event) => {  
        setSuccessful(false)
        setImageWidth(event.target.value)
    } 
    const addImageHeight = (event) => {  
        setSuccessful(false)
        setImageHeight(event.target.value)
    }  
    const addTilesetName = (event) => {
        setSuccessful(false)
        setTileName(event.target.value)
    }

    const handleAddTile = async () => {
       
        const cld = new Cloudinary({
            cloud: {
              cloudName: 'natialemu47'
            }
        });
        const myImage = cld.image('v1670625672/Tileslate/plain-white-background-or-wallpaper-abstract-image-2E064N7_gbgqgo.jpg');
        
        const src = myImage.resize(fill().width(imageWidth).height(imageHeight)).toURL();

        console.log(src)
        console.log(store.currentMap.tilesets[0].tilewidth, store.currentMap.tilesets[0].tileheight)
        const tileWidth = store.currentMap.tilesets[0].tilewidth
        const tileHeight = store.currentMap.tilesets[0].tileheight
        
        if (imageHeight == "" || imageWidth == "" || tileName == ""){
            setMessage("Make sure all fields are filled!")
            setSuccessful(true)
            return;
        }
        if(imageHeight % tileHeight != 0 || imageWidth % tileWidth != 0 ) {
            setMessage("This image size is not compatible with the current map tile size.")
            setSuccessful(true)
            return;
        }

        await store.addTilsetToMap(src, tileWidth, tileHeight, imageHeight, imageWidth, tileName )
        await store.setCurrentTileset(store.currentMap.tilesets[store.currentMap.tilesets.length - 1]._id)
        navigate("/tileseteditor/" + store.currentMapInfo._id + "/" + store.currentMap.tilesets[store.currentMap.tilesets.length - 1]._id)
        onClose()
    } 
    
    return(
        <Box>
        <Modal
            open={true}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>

                <Box className="qmodal-text">Add Tileset Width</Box>
                <TextField
                required
                id="outlined-tags-input"
                label="Image width"
                type="number"
                variant="filled"
                autoComplete="current-tags"
                className = "text-field"
                value = {imageWidth}
                onChange={(event) => addImageWidth(event)}
                />

                <Box className="qmodal-text">Add Tileset Height</Box>
                <TextField
                required
                id="outlined-tags-input"
                label="Image Height"
                type= 'number'
                variant="filled"
                autoComplete="current-tags"
                className = "text-field"
                value = {imageHeight}
                onChange={(event) => addImageHeight(event)}
                />
                
                
                <Box className="qmodal-text">Add Tileset Name</Box>
                <TextField
                required
                id="outlined-tags-input"
                label="Tileset name"
                type= 'string'
                variant="filled"
                autoComplete="current-tags"
                className = "text-field"
                value = {tileName}
                onChange={(event) => addTilesetName(event)}
                />

                {successful && <Typography fontSize="15px" sx={{color : 'red'}}> {message} </Typography>}

                <Box paddingTop={3} display="flex" justifyContent="space-between">
                    <Button variant="contained" onClick={handleAddTile}>Add Tileset</Button>
                    <Button variant="contained" onClick={onClose}>Close</Button>
                </Box>


            </Box>
        </Modal>
        </Box> 
    )}

export default TilsetCreateModal;