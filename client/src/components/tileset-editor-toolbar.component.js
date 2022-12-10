import '../App.css';
import "../App"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { saveAs } from 'file-saver'
import { GlobalStoreContext } from '../store'
import { uploadImageToCloudinaryAPIMethod } from "../api/cloudinary"

const TileSetToolBar=() =>{
    const { store } = useContext(GlobalStoreContext);
    const navigate = useNavigate();


    const handleEditMap = async () => {
        await store.loadMapById(window.location.pathname.split("/")[2]);
        navigate("/editor/" + store.currentMap.mapinfo)
    }
    const handledownloadTileset = () => {
        console.log(store.currentTileSet.image)
        saveAs(store.currentTileSet[0].image, 'Tileset.jpg') 
    }
    
    const handleTilesetEdit = (event) => {
        console.log("New File Selected");
        
        if (event.target.files && event.target.files[0]) {

            var reader = new FileReader();

            //Read the contents of Image File.
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = function (e) {

            //Initiate the JavaScript Image object.
            var image = new Image();

            //Set the Base64 string return from FileReader as source.
            image.src = e.target.result;
           
            //Validate the File Height and Width.
            
            image.onload = function () {
                
                var height = this.height;
                var width = this.width;
                
                if (height !== parseInt(store.currentTileSet[0].imageheight) || width !== parseInt(store.currentTileSet[0].imagewidth)) {
                    alert("Height and Width must match original tileset.");
                    return false
                    
                }else{
                    console.log("Uploaded image has valid Height and Width.");
                }
            };
          
            };
            console.log("flag")
         
            
      
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
                store.EditedTilsetToMap(response.url, store.currentTileSet[0]._id)
                alert("Tileset created");
            });
        }
    }

    return (
        <Box className='top-navbar' sx={{ display: 'flex' ,flexGrow: 1,}} >
           <AppBar position="static" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1}}>
              <Toolbar sx={{backgroundColor:'#1E1E1E',boxShadow: '0 1px 1px 1px rgba(68,68,69,255)',boxShadow: 1 ,justifyContent: 'space-between'}}> 
            <Box sx={{marginLeft:'80%'}}>

                {/* <Button  onClick={handledownloadTileset} sx = {{backgroundImage: 'linear-gradient(to right,#a51916,#F83600)',borderRadius:'10px',color:"white",fontWeight:"bold",fontSize:15,marginX:1}}>
                    Export
                </Button> */}

                <Button component="label" sx = {{backgroundImage: 'linear-gradient(to right,#fa5a01,#fe9f05)',borderRadius:'10px',color:"white",fontWeight:"bold",fontSize:15,marginX:1}}>
                    Import and Save 
                    <input hidden accept="image/*" multiple type="file" onChange={handleTilesetEdit} />
                </Button>
                
                {/* <IconButton aria-label="settings">
                <SettingsTwoToneIcon sx={{fill:"#C0C0C0" ,fontSize:40}}/>
                </IconButton> */}

                <IconButton aria-label="close" onClick={handleEditMap}>
                <CancelTwoToneIcon sx={{fill:"#C0C0C0" ,fontSize:40}}/>
                </IconButton>
                
            </Box>
            </Toolbar>
           </AppBar>
        </Box>
    );
  }

  export default TileSetToolBar;