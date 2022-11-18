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

const SearchSettings = ({onClose, changePageUp, changePageDown, pageNum, changeSortBy, sortingBy}) => {
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

    const handleChange = (event) => {
        changeSortBy(event.target.textContent)
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
                <Typography fontSize="20px" paddingBottom={2} margin={1}>

                    <Box className="qmodal-text">
                        Page {pageNum}
                    </Box>
                    <Button variant="contained" onClick={() => changePageUp()}>+</Button>
                    <Button variant="contained" color="error" onClick={() => changePageDown()}>-</Button>
                </Typography>
                Sort By:
                <Box paddingBottom={4}>
                    <Button variant={sortingBy == "Likes" ? "contained" : ""} color="success" onClick={(event) => handleChange(event)}>Likes</Button>
                    <Button variant={sortingBy == "Dislikes" ? "contained" : ""} color="success" onClick={(event) => handleChange(event)} >Dislikes</Button>
                    <Button variant={sortingBy == "Downloads" ? "contained" : ""}  color="success" onClick={(event) => handleChange(event)}>Downloads</Button>
                </Box>
                <Box display="flex" justifyContent="space-between">
                    <Button variant="contained" color="warning" onClick={onClose} marginLeft={3}>Close</Button>
                </Box>
            </Box>
        </Modal>
        </Box> 
    )}

export default SearchSettings;