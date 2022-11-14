import Box from '@mui/material/Box';
import { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import "../App.css"
import Typography from '@mui/material/Typography';
import mapImage from '../assets/map-card.jpg';
import CommentSection from '../components/comment-section.component';
import RightSidebar from "../components/right-sidebar.component"

const MapViewer=() =>{ 
    const { store } = useContext(GlobalStoreContext);
    const [mapInfo_id, setMapInfo_id] = useState("")
    
    useEffect(() => {
      if (store.currentMap.name == null){
        store.loadMapById(window.location.pathname.split("/")[2]);
      }
    }, [])

    return (
      <Box className="home-container" sx={{marginLeft:'260px' }}>
        <Typography variant="h4" sx={{backgroundImage: 'linear-gradient(to top, lightgrey 0%, lightgrey 1%, #e0e0e0 26%, #efefef 48%, #d9d9d9 75%, #bcbcbc 100%)',boxShadow: '0 1px 1px 1px rgba(68,68,69,255)',boxShadow: 1,borderRadius:'10px',justifyContent: 'center',maxWidth:"80%",color:"grey",marginBottom:'2%',padding:'2%'}}>
          {store.currentPublishedMap.name ? store.currentPublishedMap.name : "error"}
        </Typography>
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
        <RightSidebar/>
      </Box>
    );
  }
  
  export default MapViewer;