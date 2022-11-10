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
import LoginModal from '../components/login-modal.component';


const MyProjects=() =>{ 
    const { store } = useContext(GlobalStoreContext);
    const {auth} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
      store.loadUserMaps(auth.user.username);
  }, []);


    const handleEdits = () => {   
      navigate("/editor")
    }

    let mapList = 
    <Box>
      {store.userMaps.filter((map) => (
          map.published == "false"
        )).map((map) => (
          <MapCard key={map.id} mapInfo={map} />
        ))}  

      <Typography variant="h4" sx={{backgroundImage: 'linear-gradient(to top, lightgrey 0%, lightgrey 1%, #e0e0e0 26%, #efefef 48%, #d9d9d9 75%, #bcbcbc 100%)',borderRadius:'10px',justifyContent: 'center',maxWidth:"25%",color:"grey",marginTop:'3%',marginBottom:'2%',padding:'1%',fontSize:22}}> Published Maps </Typography>
        {store.userMaps.filter((map) => (
          map.published != "false"
        )).map((map) => (
          <MapCard key={map.id} mapInfo={map} />
        ))}
    </Box>

    if(store.userMaps.length == 0) {
      mapList = null;
    }


  
  
    return (
      <Box className="home-container" sx={{marginLeft:'260px' }}>
        <Typography variant="h4" sx={{borderRadius:'10px',justifyContent: 'center',maxWidth:"90%",color:"fffcfc",marginTop:'1%',marginBottom:'2%',padding:'2%',font: 'Bebas Neue'}}>My Projects</Typography>
        <Box 
          className="mapcard-container" 
          sx={{ 
            overflow: 'scrool',
            maxHeight:"500px",
            overflowY:'scroll',
            width:"90%",
            "&::-webkit-scrollbar": {
              width: 10,
            },
            "&::-webkit-scrollbar-track": {
              boxShadow: `inset 0 0 6px rgba(0, 0, 0, 0.3)`,
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#ffc806",
              outline: `1px solid #ffc806`,
            }}}>
        <Box display='flex' justifyContent='space-between' >
        <Button variant="h4" sx={{backgroundImage: 'linear-gradient(to top, lightgrey 0%, lightgrey 1%, #e0e0e0 26%, #efefef 48%, #d9d9d9 75%, #bcbcbc 100%)',boxShadow: '0 1px 1px 1px rgba(68,68,69,255)',boxShadow: 1,borderRadius:'10px',justifyContent: 'center',maxWidth:"30%",color:"grey",marginTop:'1%',marginRight:'3%',marginBottom:'2%',padding:'1%',fontSize:20}}onClick={handleEdits}> Create New Project </Button>
        </Box> 
        {mapList}
        </Box>
      </Box>
    );
  }
  
  export default MyProjects;