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
import IconButton from '@mui/material/IconButton';


const MapTeams = ({onClose}) => {
    const {store} = useContext(GlobalStoreContext)
    const {auth} = useContext(AuthContext)

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
      const [title, setTitle] = useState(store.currentMapInfo.name)            // For title 
      const [creators, setCreators] = useState(store.currentMapInfo.creator)        // For creators input field 
      const [newCreators, setNewCreators] = useState("")                // string of users marked for addition
      const [removedCreators, setRemovedCreators] = useState([])        // string array of users marked for removal
      const [changesMade, setChangesMade] = useState(false)

    const addTeam = (event) => {  
        setNewCreators(event.target.value)
    }  

    const removeTeam = (markedUser) => {
        store.removeTeamMember(markedUser)
        let newList = creators.filter(maker => maker.creator != markedUser)
        setCreators(newList)
    }

    const handleUpdateTeams = async () => {
        store.addTeamMember(newCreators);
        
        if(store.currentMapInfo.creator != creators){
            setChangesMade(true)
        }
        setNewCreators("");
        setCreators(store.currentMapInfo.creator)

    }

    const successfulChanges = changesMade ? <Typography fontSize="20px">{store.error == "" ? "Team updated" : store.error}</Typography>:null
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
                    <ListItem>
                        <ListItemText primary={member.creator} />
                        
                        {auth.user.username != member.creator ?
                            <ListItemButton onClick={() => removeTeam(member.creator)}>
                            < Button> Remove</Button>
                        </ListItemButton>
                        : null}   


                        <Divider />
                    </ListItem>
                    
                ))}
                </List>
                <Box className="qmodal-text">Add Team Member</Box>
                {successfulChanges}
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