import Box from '@mui/material/Box';
import { useContext,useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import "../App.css"
import Typography from '@mui/material/Typography';
import MapCard from '../components/map-card.component';
import mapImage from '../assets/map-card.jpg';
import mockUserImage from '../assets/guestImage.jpg'
import AuthContext from '../auth';

function LikedMaps() {

  const {auth} = useContext(AuthContext);
  const {store} = useContext(GlobalStoreContext)
    
  useEffect(() => {
    if (auth.user !== null){
      store.loadMapInfosByIds(auth.user.liked_projects);
    }
  }, [auth.user])


  let mapList = <Box 
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

  if(store.publishedMaps.length == 0) {
    mapList = <Typography color="white" fontSize={24}>You have not liked any maps yet.</Typography>
  }

    return (
      <Box className="home-container" sx={{marginLeft:'260px' }}>

        <Typography variant="h4" sx={{color:"white",marginTop:'1%',marginBottom:'2%', font: 'Bebas Neue'}}>Maps Liked By You</Typography>
        {mapList}
      </Box>
    );
  }
  
  export default LikedMaps;