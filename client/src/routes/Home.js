import Box from '@mui/material/Box';
import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import "../App.css"
import { useEffect } from 'react'
import AuthContext from '../auth';
import HomeBanner from '../components/banner.component';
import Typography from '@mui/material/Typography';
import MapCard from '../components/map-card.component';


function Home() {
    const { store } = useContext(GlobalStoreContext);
    const {auth} = useContext(AuthContext);

    useEffect(() => {
      store.getMapInfosSortedByLikes();
    }, [])

    return (
      <Box className="home-container" sx={{marginLeft:'260px' }}>
        <HomeBanner/>
        <Typography variant="h4" sx={{color:"white",font:'Bebas Neue',marginTop:'1.5%',marginBottom:'2%'}}>Most Popular Maps</Typography>

        <Box 
          className="mapcard-container" 
          sx={{ 
            maxHeight:"410px",
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
            <MapCard key={map._id} mapInfo={map} />
          ))}
        </Box>
      </Box>
    );
  }
  
  export default Home;