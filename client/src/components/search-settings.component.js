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

const SearchSettings = ({onClose, onSettings}) => {
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

    const handleCloseModal = () => {
        setModalOpen(false);
    }

    let modal = modalOpen ? <LoginModal message="Settings saved!" onClose={handleCloseModal}></LoginModal> : null

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

                    <Box className="qmodal-text">Only show maps you are a member of</Box>

                    <Box className="qmodal-text">Sort By</Box>

                </Typography>
                <Box display="flex" justifyContent="space-between">
                    <Button variant="contained" onClick={onSettings} paddingRight={2}>Save Settings</Button>
                    <Button variant="contained" onClick={onClose} marginLeft={3}>Close</Button>
                </Box>
            </Box>
        </Modal>
        </Box> 
    )}

export default SearchSettings;