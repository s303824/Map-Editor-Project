import '../App.css';
import "../App"
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../auth';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import UndoIcon from '@mui/icons-material/Undo';
import RedoTwoToneIcon from '@mui/icons-material/RedoTwoTone';
import ApprovalTwoToneIcon from '@mui/icons-material/ApprovalTwoTone';
import FormatColorFillTwoToneIcon from '@mui/icons-material/FormatColorFillTwoTone';
import AutoFixNormalSharpIcon from '@mui/icons-material/AutoFixNormalSharp';
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';

const MapToolBar=() =>{
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate("/projects", {})
    }

    return (
        <Box className='top-navbar' sx={{ display: 'flex' ,flexGrow: 1,}} >
           <AppBar position="static" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1}}>
              <Toolbar sx={{boxShadow: 1 ,backgroundColor:'#1E1E1E',boxShadow: '0 1px 1px 1px rgba(68,68,69,255)',justifyContent: 'space-between'}}> 
            <Box>
                <Button sx = {{backgroundImage: 'linear-gradient(to right,#a51916,#F83600)',borderRadius:'10px',color:"white",fontWeight:"bold",marginX:1}}>
                    Manage Team
                </Button>

               <IconButton aria-label="undo">
                <UndoIcon sx={{fill:"white" ,fontSize:40}}/>
                </IconButton>

                <IconButton aria-label="redo">
                <RedoTwoToneIcon sx={{fill:"white" ,fontSize:40}}/>
                </IconButton>

                <IconButton aria-label="stamp">
                <ApprovalTwoToneIcon sx={{fill:"white" ,fontSize:40}}/>
                </IconButton>

                <IconButton aria-label="paint">
                <FormatColorFillTwoToneIcon sx={{fill:"white" ,fontSize:40}}/>
                </IconButton>

                <IconButton aria-label="delete">
                <AutoFixNormalSharpIcon sx={{fill:"white" ,fontSize:40}}/>
                </IconButton>
            </Box>
            <Box >
            <Button sx = {{backgroundImage: 'linear-gradient(to right,#a51916,#F83600)',borderRadius:'10px',color:"white",fontWeight:"bold",fontSize:15,marginX:1}}>
                    Export
                </Button>

                <Button sx = {{backgroundImage: 'linear-gradient(to right,#fa5a01,#fe9f05)',borderRadius:'10px',color:"white",fontWeight:"bold",fontSize:15,marginX:1}}>
                    Save 
                </Button>

                <Button sx = {{backgroundImage: 'linear-gradient(to right,#fda204,#ffc406)',borderRadius:'10px',color:"white",fontWeight:"bold",fontSize:15,marginX:1}}>
                    Publish
                </Button>

                <IconButton aria-label="settings">
                <SettingsTwoToneIcon sx={{fill:"#C0C0C0" ,fontSize:40}}/>
                </IconButton>

                <IconButton aria-label="close" onClick={handleGoBack}>
                <CancelTwoToneIcon sx={{fill:"#C0C0C0" ,fontSize:40}}/>
                </IconButton>
                
            </Box>
            </Toolbar>
           </AppBar>
        </Box>
    );
  }

  export default MapToolBar;