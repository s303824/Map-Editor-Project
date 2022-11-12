import '../App.css';
import "../App"
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../auth';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

import GlobalStoreContext from '../store';

const MapSettings = ({onClose}) => {
    const {store} = useContext(GlobalStoreContext)

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: "#FFFFFF",
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
      const [title, setTitle] = useState(store.currentMap.mapinfo.title)            // For title input field 
      const [description, setDescription] = useState(store.currentMap.mapinfo.description)                                 // For tags input field 
      const [tags, setTags] = useState(store.currentMap.mapinfo.tags)                                 // For tags input field 

      const updateField = (event, type) => {
        switch(type){
            case "title":
                setTitle(event.target.value)
                break;
            case "description":
                setDescription(event.target.value)
                break;
            case "tags":
                setTags(event.target.value)
                break;
        }
    }  

    const handleUpdateSettings = async () => {
        await store.changeMapSettings(store.currentMap.mapinfo, title, description, tags);
        onClose();
    }


    let tagsList = ""
    tagsList.length !== 0 && tags.forEach(tag => tagsList += tag + " ")
   
    return(
        <Box>
        <Modal
            open={true}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>

            <Typography fontSize="20px">
                <Box className="qmodal-text">Title</Box>
                <Box className="qmodal-text">{title}</Box>
                <TextField
                required
                id="outlined-title-input"
                label="Title"
                type="title"
                variant="filled"
                autoComplete="current-title"
                className = "text-field"
                onChange={(event) => updateField(event, "title")}
                />
                <Box className="qmodal-text">Description</Box>
                <Box className="qmodal-text">{description}</Box>
                <TextField
                required
                id="outlined-title-input"
                label="Title"
                type="title"
                variant="filled"
                autoComplete="current-title"
                className = "text-field"
                onChange={(event) => updateField(event, "description")}
                />
                <Box className="qmodal-text">Tags</Box>
                <Box className="qmodal-text">{tagsList}</Box>
                <TextField
                required
                id="outlined-tags-input"
                label="Tags"
                type="tags"
                variant="filled"
                autoComplete="current-tags"
                className = "text-field"
                onChange={(event) => updateField(event, "tags")}
                />
            </Typography>
            <Button variant="contained" onClick={handleUpdateSettings}>Update Map</Button>
            <Button variant="contained" onClick={onClose}>Close</Button>
            </Box>
        </Modal>
        </Box> 
    )}

export default MapSettings;