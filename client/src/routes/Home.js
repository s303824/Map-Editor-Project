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
import mockUserImage from '../assets/guestImage.jpg'


function Home() {
    const { store } = useContext(GlobalStoreContext);
    const {auth} = useContext(AuthContext);

    useEffect(() => {
      if (auth.user !== null){
        store.getMapInfosSortedByLikes();
      }
    }, [auth.user])

    return (
      <Box className="home-container" sx={{marginLeft:'260px' }}>
        <HomeBanner/>
        <Typography variant="h4" sx={{color:"white",font:'Bebas Neue',marginTop:'3%',marginBottom:'2%'}}>Most Popular Maps</Typography>

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
          {store.publishedMaps.map((map) => (
            <MapCard key={map.id} mapInfo={map} />
          ))}
        </Box>
      </Box>
    );
  }
  
  export default Home;