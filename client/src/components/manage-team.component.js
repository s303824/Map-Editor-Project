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
import CancelIcon from '@mui/icons-material/Cancel';
import GlobalStoreContext from '../store';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const MapTeams = ({onClose}) => {
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
      const [creators, setCreators] = useState(store.currentMap.mapinfo.creators)        // For creators input field 
      const [newCreators, setNewCreators] = useState([])
      const [removedCreators, setRemovedCreators] = useState([])

    const addTeam = (event) => {    
        let additionalMembers = newCreators.push(event.target.value)
        setNewCreators(additionalMembers)
    }  

    const removeTeam = (event, member) => {    
        let lessMembers = removedCreators.push(member)
        setRemovedCreators(lessMembers)
    }  

    const handleUpdateTeams = async () => {
        await store.removeTeamMember(store.currentMap.mapinfo, removedCreators);
        await store.addTeamMember(store.currentMap.mapinfo, newCreators);
    }
    return(
        <Box>
        <Modal
            open={true}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>

            <Typography fontSize="20px">
                <Box className="qmodal-text">{title}</Box>
                <Box className="qmodal-text">Creators</Box>
                <List>
                {creators.map((member) => (
                    <ListItem disablePadding>
                    <ListItemText primary={member.username} />
                    <ListItemButton onClick={removeTeam(member)}>
                        <ListItemIcon>
                        {CancelIcon}
                        </ListItemIcon>
                    </ListItemButton>
                    </ListItem>
                ))}
                </List>
                <Box className="qmodal-text">Add Team Member</Box>
                <TextField
                required
                id="outlined-tags-input"
                label="Tags"
                type="tags"
                variant="filled"
                autoComplete="current-tags"
                className = "text-field"
                onChange={(event) => addTeam(event)}
                />
            </Typography>
            <Button variant="contained" onClick={handleUpdateTeams}>Update Team</Button>
            <Button variant="contained" onClick={onClose}>Close</Button>

            </Box>
        </Modal>
        </Box> 
    )}

export default MapTeams;