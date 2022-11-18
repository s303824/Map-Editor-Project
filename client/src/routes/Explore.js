import Box from '@mui/material/Box';
import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import "../App.css"
import Typography from '@mui/material/Typography';
import MapCard from '../components/map-card.component';
import AuthContext from '../auth';
import mapImage from '../assets/map-card.jpg'
import mockUserImage from '../assets/guestImage.jpg'


function SearchResults() {
    const { store } = useContext(GlobalStoreContext);
    const {auth} = useContext(AuthContext);


    let maps = store.searchResults.length > 0 ?
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

    {store.searchResults.map((map) => (
      <MapCard key={map._id} mapInfo={map} />
    ))}
  </Box>
    : 

    <Typography color="white" fontSize={24}>There are no maps matching your current search</Typography>

    return (
      <Box className="home-container" sx={{marginLeft:'260px' }}>

        <Typography variant="h4" sx={{color:"white",font:'Bebas Neue',marginTop:'1%',marginBottom:'2%'}}>
          Search Results
        </Typography>

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
              {maps}
        </Box>
      </Box>
    );
  }
  
  export default SearchResults;