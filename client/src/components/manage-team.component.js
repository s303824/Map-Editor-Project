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
import Divider from '@mui/material/Divider';

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
      const [title, setTitle] = useState(store.currentMapInfo.name)            // For title input field 
      const [creators, setCreators] = useState(store.currentMapInfo.creator)        // For creators input field 
      const [newCreators, setNewCreators] = useState("")
      const [removedCreators, setRemovedCreators] = useState([])

    const addTeam = (event) => {  
        //setNewCreators(event.target.value)
    }  

    const removeTeam = (event, member) => {    
        const newList = creators.filter((maker) => maker.username !== member);
        setCreators(newList)
        const lessMembers = removedCreators
        lessMembers.push(member)
        setRemovedCreators(lessMembers)
        }  

    const handleUpdateTeams = async () => {
        store.removeTeamMember(store.currentPublishedMap, removedCreators);
        /*let memberList = newCreators.split(" ")
        store.addTeamMember(store.currentPublishedMap, memberList);
        store.removeTeamMember(store.currentPublishedMap, removedCreators);
        */
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
                <Box className="qmodal-text">{`Creators of ${title}`}</Box>
                <Divider />
                <List>
                {creators.map((member) => (
                    <ListItem key={member.username}>
                        <ListItemText primary={member.username} />
                        <ListItemButton onClick={removeTeam(member.username)}>
                            <Button variant="contained"><CancelIcon/></Button>
                        </ListItemButton>
                        <Divider />
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
            <Box paddingTop={3} display="flex" justifyContent="space-between">
                <Button variant="contained" onClick={handleUpdateTeams}>Update Team</Button>
                <Button variant="contained" onClick={onClose}>Close</Button>
            </Box>


            </Box>
        </Modal>
        </Box> 
    )}

export default MapTeams;