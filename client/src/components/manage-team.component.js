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
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LoginModal from "../components/login-modal.component";

const MapTeams = ({onClose}) => {
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
      const [title, setTitle] = useState(store.currentMapInfo.name)            // For title input field 
      const [creators, setCreators] = useState(store.currentMapInfo.creator)        // For creators input field 
      const [newCreators, setNewCreators] = useState("")
      const [removedCreators, setRemovedCreators] = useState([])

    const addTeam = (event) => {  
        //setNewCreators(event.target.value)
    }  

    const removeTeam = (event, member) => {    
        // removedCreators.push(member)
        // setRemovedCreators(removedCreators)
        // creators.pop(member)
        // setCreators(creators)
        }  

    const handleUpdateTeams = async () => {
        /*let memberList = newCreators.split(" ")
        store.addTeamMember(store.currentPublishedMap, memberList);
        store.removeTeamMember(store.currentPublishedMap, removedCreators);
        setModalOpen(true);*/
    }

    const handleCloseModal = () => {
        setModalOpen(false);
    }

    let modal = modalOpen ? <LoginModal message="Successfully updated!" onClose={handleCloseModal}></LoginModal> : null


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
                <Box className="qmodal-text">{title}</Box>
                <Box className="qmodal-text">Creators</Box>
                <List>
                {creators.map((member) => (
                    <ListItem disablePadding>
                        <ListItemText primary={member.creator} />
                        <ListItemButton onClick={removeTeam(member)}>
                            <Button>Remove</Button>
                        </ListItemButton>
                    </ListItem>
                ))}
                </List>
                <Box className="qmodal-text">Add Team Member</Box>
                <TextField
                required
                id="outlined-tags-input"
                label="Username"
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