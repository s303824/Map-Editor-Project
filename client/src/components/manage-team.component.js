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
import IconButton from '@mui/material/IconButton';
import UndoIcon from '@mui/icons-material/Undo';
import RedoTwoToneIcon from '@mui/icons-material/RedoTwoTone';
import ApprovalTwoToneIcon from '@mui/icons-material/ApprovalTwoTone';
import FormatColorFillTwoToneIcon from '@mui/icons-material/FormatColorFillTwoTone';
import AutoFixNormalSharpIcon from '@mui/icons-material/AutoFixNormalSharp';
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import GlobalStoreContext from '../store';

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
  
      const updateField = (event) => {    
        setCreators(event.target.value)
    }  

    const handleUpdateTeams = async () => {
        await store.addTeamMember(store.currentMap.mapinfo, creators);
        onClose();
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
                <Box className="qmodal-text">Current Team: {creators.map((creator)=>{creator})}</Box>
                <TextField
                required
                id="outlined-tags-input"
                label="Tags"
                type="tags"
                variant="filled"
                autoComplete="current-tags"
                className = "text-field"
                onChange={(event) => updateField(event)}
                />
            </Typography>
            <Button variant="contained" onClick={handleUpdateTeams}>Add Team Member</Button>
            <Button variant="contained" onClick={onClose}>Close</Button>

            </Box>
        </Modal>
        </Box> 
    )}

export default MapTeams;