import { Button, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import "../App.css"
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const LoginModal = ({message, onClose}) => {
    
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: "#524d4d",
        color: "white",
        backgroundImage :'linear-gradient(to bottom, #505051, #303031)',
        border: '2px solid #FFF',
        boxShadow: 24,
        p: 4,
      };

    return(
        <Box color="white">
        <Modal
            open={true}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>

            <Typography fontSize="20px">
                <Box className="qmodal-text" color="white">{message}</Box>
            </Typography>
            <Button variant="contained" onClick={onClose}>Close</Button>

            </Box>
        </Modal>
        </Box> 
    )}

export default LoginModal;