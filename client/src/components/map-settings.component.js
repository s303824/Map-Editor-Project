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
import LoginModal from "../components/login-modal.component";

import GlobalStoreContext from '../store';

const MapSettings = ({onClose}) => {
    const {store} = useContext(GlobalStoreContext)
    const [modalOpen, setModalOpen] = useState(false);

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
      let initialTags = ""
      store.currentMapInfo.tags.forEach(tag => initialTags += tag + " ")
  

      const [title, setTitle] = useState(store.currentMapInfo.name)            // For title input field 
      const [description, setDescription] = useState(store.currentMapInfo.description)                                 // For tags input field 
      const [tags, setTags] = useState(initialTags)                                 // For tags input field 

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
        let tagList = tags.split(" ")
        store.changeMapSettings(store.currentMapInfo._id, title, description, tagList);
        setModalOpen(true);
    }

    const handleCloseModal = () => {
        setModalOpen(false);
    }

    let modal = modalOpen ? <LoginModal message="Successfully updated!" onClose={handleCloseModal}></LoginModal> : null
    console.log(store.currentMapInfo)

    return(
        <Box>
            {modal}
        <Modal
            open={true}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>

            <Typography fontSize="20px">

                <Box className="qmodal-text">Title</Box>
                <TextField
                required
                value={title}
                id="outlined-title-input"
                label="Title"
                type="title"
                variant="filled"
                autoComplete="current-title"
                className = "settings-modal-textfield"
                onChange={(event) => updateField(event, "title")}
                />

                <Box className="qmodal-text">Description</Box>
                <TextField
                required
                value = {description}
                id="outlined-title-input"
                label="Description"
                type="title"
                variant="filled"
                autoComplete="current-title"
                className = "settings-modal-textfield"
                onChange={(event) => updateField(event, "description")}
                />
                <Box paddingBottom={3}>
                    <Box className="qmodal-text">Tags</Box>
                    <TextField
                    required
                    value = {tags}
                    id="outlined-tags-input"
                    label="Tags"
                    variant="filled"
                    
                    className = "settings-modal-textfield"
                    onChange={(event) => updateField(event, "tags")}
                    />
                </Box>
            </Typography>
            <Box display="flex" justifyContent="space-between">
                <Button variant="contained" onClick={handleUpdateSettings} paddingRight={2}>Update Map</Button>
                <Button variant="contained" onClick={onClose} marginLeft={3}>Close</Button>
            </Box>
            </Box>
        </Modal>
        </Box> 
    )}

export default MapSettings;