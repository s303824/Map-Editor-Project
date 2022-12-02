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
import { uploadImageToCloudinaryAPIMethod } from "../api/cloudinary"



const EditTileT = ({onClose}) => {
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
              
    const [tileImage, setTileImage] = useState("")              
    const [successful, setSuccessful] = useState(false)
    const [message, setMessage] = useState("")

    const handleImageSelected = (event) => {  
        setSuccessful(false)     
        console.log("New File Selected");
        if (event.target.files && event.target.files[0]) {
      
            // Could also do additional error checking on the file type, if we wanted
            // to only allow certain types of files.
            const selectedFile = event.target.files[0];
            console.dir(selectedFile);
      
            const formData = new FormData();
            // TODO: You need to create an "unsigned" upload preset on your Cloudinary account
            // Then enter the text for that here.
            const unsignedUploadPreset = 'mftlkxf6'
            formData.append('file', selectedFile);
            formData.append('upload_preset', unsignedUploadPreset);
      
            console.log("Cloudinary upload");
            uploadImageToCloudinaryAPIMethod(formData)
            .then(async(response) => {
                console.log("Upload success");
                console.dir(response);
                console.log(response.url)
                // Now the URL gets saved to the tileimage
                setTileImage(response.url)
            
            });
        }

    }

    const handleAddTile = () => {  
        if (tileImage == ""){
            setMessage("Add Edited Image to Continue!")
            setSuccessful(true)
            return;
        }
        store.EditedTilsetToMap_Temp(tileImage, store.currentTileSet[0]._id)
        onClose()
    } 
    
    return(
        <Box>
        <Modal
            open={true}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Box>
                    <h5>Due to technical issues with literallycanvas, As a temporary solution Edit your tileset at: </h5>
                    <a href='https://pixlr.com/x/'target="_blank" rel="noopener noreferrer"> https://pixlr.com/</a> 
                    <h5>and add your TilsetAdd</h5>
                </Box>
                <Box className="qmodal-text">Add Edited Tileset Image</Box>
                <span>
                    <h6 style={{overflow: "hidden", "marginBottom": "12px", "marginTop": "8px"}}>{tileImage}</h6>
                    <Button variant="contained" className='button-color' component="label" size="small">
                        Add Tileset Image
                        <input hidden accept="image/*" multiple type="file" onChange={handleImageSelected} />
                    </Button>
                </span>

                {successful && <Typography fontSize="15px" sx={{color : 'red'}}> {message} </Typography>}

                <Box paddingTop={3} display="flex" justifyContent="space-between">
                    <Button variant="contained" onClick={handleAddTile}>Continue</Button>
                    {/* <Button variant="contained" onClick={onClose}>Close</Button> */}
                </Box>


            </Box>
        </Modal>
        </Box> 
    )}

export default EditTileT;