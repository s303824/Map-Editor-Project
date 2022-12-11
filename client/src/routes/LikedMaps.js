import Box from '@mui/material/Box';
import { useContext,useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import "../App.css"
import Typography from '@mui/material/Typography';
import MapCard from '../components/map-card.component';
import AuthContext from '../auth';

function LikedMaps() {

  const {auth} = useContext(AuthContext);
  const {store} = useContext(GlobalStoreContext)
  const [maps, setMaps] = useState(null)
    
  useEffect(() => {
    const getData = async () => {
      setMaps(await store.loadMapInfosByIds(auth.user.liked_projects))
    }

    if (auth.user !== null){
      getData();
    }
  }, [auth.user])

  let mapList = maps != null ?
                maps.length == 0 ?
                <Box sx={{color:"white"}}>You have no liked maps!</Box>
                : 
  <Box 
    className="mapcard-container" 
    sx={{ 
      overflow: 'scrool',
      maxHeight:"700px",
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

    {maps.map((map) => (
      <MapCard key={map._id} mapInfo={map} />
    ))}
  </Box> 
  : <Box className="loading"></Box>

    return (
      <Box className="home-container" sx={{marginLeft:'260px' }}>

        <Typography variant="h4" sx={{color:"white",marginTop:'0%',marginBottom:'2%', font: 'Bebas Neue'}}>Maps Liked By You</Typography>
        {mapList}
      </Box>
    );
  }
  
  export default LikedMaps;