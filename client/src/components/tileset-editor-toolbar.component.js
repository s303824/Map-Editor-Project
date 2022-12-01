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
import { useContext } from 'react';
import { saveAs } from 'file-saver'
import { GlobalStoreContext } from '../store'

const TileSetToolBar=() =>{
    const { store } = useContext(GlobalStoreContext);
    const navigate = useNavigate();
    const handleEditMap = () => {
        navigate("/editor", {})
    }
    const handledownloadTileset = () => {
        console.log(store.currentTileSet.image)
        saveAs(store.currentTileSet[0].image, 'Tileset.jpg') 
    }

    return (
        <Box className='top-navbar' sx={{ display: 'flex' ,flexGrow: 1,}} >
           <AppBar position="static" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1}}>
              <Toolbar sx={{backgroundColor:'#1E1E1E',boxShadow: '0 1px 1px 1px rgba(68,68,69,255)',boxShadow: 1 ,justifyContent: 'space-between'}}> 
            <Box sx={{marginLeft:'80%'}}>

            <Button  onClick={handledownloadTileset} sx = {{backgroundImage: 'linear-gradient(to right,#a51916,#F83600)',borderRadius:'10px',color:"white",fontWeight:"bold",fontSize:15,marginX:1}}>
                    Export
                </Button>

                <Button sx = {{backgroundImage: 'linear-gradient(to right,#fa5a01,#fe9f05)',borderRadius:'10px',color:"white",fontWeight:"bold",fontSize:15,marginX:1}}>
                    Save 
                </Button>
                
                <IconButton aria-label="settings">
                <SettingsTwoToneIcon sx={{fill:"#C0C0C0" ,fontSize:40}}/>
                </IconButton>

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