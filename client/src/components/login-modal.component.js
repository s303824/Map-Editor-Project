import { Button, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import "../App.css"
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'
import AuthContext from '../auth';
import HomeBanner from '../components/banner.component';
import Typography from '@mui/material/Typography';
import MapCard from '../components/map-card.component';
import List from '@mui/material/List';
import mapImage from '../assets/map-card.jpg';
import Modal from '@mui/material/Modal';

const LoginModal = ({message, onClose}) => {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };



    return(
        <Box>
        <Modal
            open={true}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>

            <Typography fontSize="20px">
                <Box className="qmodal-text">{message}</Box>
            </Typography>
            <Button variant="contained" onClick={onClose}>Close</Button>

            </Box>
        </Modal>
        </Box> 
    )}

export default LoginModal;