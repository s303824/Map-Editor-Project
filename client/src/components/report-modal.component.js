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

const ReportModal = ({onClose}) => {
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
      const [report, setReport] = useState("")
      const [modalOpen, setModalOpen] = useState(false)

      const updateField = (event, type) => {
        setReport(event.target.value)
    }  

    const handleSendReport = async () => {
        //send report
        store.sendReport(report)
        setModalOpen(true)
    }

    const handleCloseModal = () => {
        setModalOpen(false);
        onClose();
    }

    let modal = modalOpen ? <LoginModal message="Successfully sent report!" onClose={handleCloseModal}></LoginModal> : null
   
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
                value={report}
                id="outlined-title-input"
                label="Report description"
                variant="filled"
                autoComplete="current-title"
                className = "settings-modal-textfield"
                onChange={(event) => updateField(event, "report")}
                />
            </Typography>
            <Box display="flex" justifyContent="space-between" paddingTop={2}>
                <Button variant="contained" onClick={handleSendReport} paddingRight={2}>Send Report</Button>
                <Button variant="contained" onClick={onClose} marginLeft={3}>Close</Button>
            </Box>
            </Box>
        </Modal>
        </Box> 
    )}

export default ReportModal;