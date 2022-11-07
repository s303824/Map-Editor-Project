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
import CommentSection from '../components/comment-section.component';
import RightSidebar from "../components/right-sidebar.component"

const MapViewer=() =>{ 
    const { store } = useContext(GlobalStoreContext);
    const {auth} = useContext(AuthContext);

    return (
      <Box className="home-container" sx={{marginLeft:'260px' }}>
        <Typography variant="h4" sx={{backgroundImage: 'linear-gradient(to top, lightgrey 0%, lightgrey 1%, #e0e0e0 26%, #efefef 48%, #d9d9d9 75%, #bcbcbc 100%)',boxShadow: '0 1px 1px 1px rgba(68,68,69,255)',boxShadow: 1,borderRadius:'10px',justifyContent: 'center',maxWidth:"80%",color:"grey",marginBottom:'2%',padding:'2%'}}>GAME 1</Typography>
        <Box display="flex" sx={{backgroundImage :'linear-gradient(to bottom, #505051, #303031)',boxShadow: '0 1px 2px 2px rgba(68,68,69,255)',marginRight:27,marginTop:5}}>
        <Box 
                m ={2}
                component="img"
                sx={{ height: 400,width:500,border:5,marginTop:3,borderColor:'#e0e0e0'}}
                 alt="map Image"
                src={mapImage}
            />
        <CommentSection/>
        </Box>
<<<<<<< HEAD
        <RightSideBar/>
=======
        <RightSidebar/>
>>>>>>> master
      </Box>
    );
  }
  
  export default MapViewer;