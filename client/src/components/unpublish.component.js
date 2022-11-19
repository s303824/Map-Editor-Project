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
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import LoginModal from "../components/login-modal.component";

import GlobalStoreContext from '../store';

const UnpublishMap = ({onClose}) => {
    const {store} = useContext(GlobalStoreContext)
    const [modalOpen, setModalOpen] = useState(false);

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
      const [title, setTitle] = useState(store.currentMapInfo.name)            // For title input field 
  
    const handlePublish = async () => {
        store.unpublishCurrentMap();
        setModalOpen(true);
    }
    const handleCloseModal = () => {
        setModalOpen(false);
    }


    let modal = modalOpen ? <LoginModal message="Successfully unpublished!" onClose={handleCloseModal}></LoginModal> : null

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
                <Box className="qmodal-text">Are you sure you want to unpublish this map?</Box>
            </Typography>
            <Box paddingTop={3} display="flex" justifyContent="space-between">
                <Button variant="contained" onClick={handlePublish}>Unpublish</Button>
                <Button variant="contained" onClick={onClose}>Close</Button>
            </Box>

            </Box>
        </Modal>
        </Box> 
    )}

export default UnpublishMap;