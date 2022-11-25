import Box from '@mui/material/Box';
import { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import "../App.css"
import Typography from '@mui/material/Typography';
import mapImage from '../assets/map-card.jpg';
import CommentSection from '../components/comment-section.component';
import RightSidebar from "../components/right-sidebar.component"
import { Grid } from '@mui/material';
import Layer from '../components/layer-component';

const MapViewer=() =>{ 
    const { store } = useContext(GlobalStoreContext);
    const [mapInfo_id, setMapInfo_id] = useState("")
    
    useEffect(() => {
      if (store.currentMap.name == null){
        store.loadMapById(window.location.pathname.split("/")[2]);
      }
    }, [])

    let mockMap = 
    <Box 
    m ={2} component="img"
    sx={{ height: 400,width:500,border:5,marginTop:3,borderColor:'#e0e0e0'}}
     alt="map Image" src={mapImage}
    />


    let realMap = 
    <Box display="flex" overflow="auto" overflowY="hidden" margin={1} maxHeight={920}>
      <Grid height xs={8} sx={{backroundColor:'white'}}>
        <Layer/>
      </Grid>
    </Box>

    return (
      <Box className="home-container" sx={{marginLeft:'205px' }}>
        <Typography variant="h4" sx={{borderRadius:'10px',justifyContent: 'center',maxWidth:"80%",color:"white",marginBottom:'2%',padding:'0.5%'}}>
          {store.currentMapInfo.name ? store.currentMapInfo.name : "error"}
        </Typography>
        <Box display="flex" sx={{backgroundImage :'linear-gradient(to bottom, #505051, #303031)',boxShadow: '0 1px 2px 2px rgba(68,68,69,255)',marginRight:20,marginTop:0}}>
        {realMap}
        <CommentSection/>
        </Box>
        <RightSidebar/>
      </Box>
    );
  }
  
  export default MapViewer;