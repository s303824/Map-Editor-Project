import Box from '@mui/material/Box';
import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import "../App.css"
import Typography from '@mui/material/Typography';
import MapCard from '../components/map-card.component';



function SearchResults() {
    const { store } = useContext(GlobalStoreContext);
    const {auth} = useContext(AuthContext);
    
    const mapCardInfo = [ //to display sample data 
      {
        "id": 2,
        "name": "Fantasy Quest 5",
        "description":"#medieval #fantasy #action",
        "likes":50,
        "dislikes":10,
        "downloads":40,
        "userName":"user2",
        "email":"user2@gmail.com",
        "editActive":null,
        "published":"2/3/2021",
        "imageUrl": ''
      },
      {
        "id": 3,
        "name": "The Fantasy Adventure",
        "description":"#fantasy #soulslike #swordandSorcery",
        "likes":10,
        "dislikes":100,
        "downloads":10,
        "userName":"user3",
        "email":"user3@gmail.com",
        "editActive":null,
        "published":"2/3/2021",
        "imageUrl": ''
      },
      {
        "id": 3,
        "name": "The Quest for Fantasy and Adventure",
        "description":"#fetchQuest #EscortMission",
        "likes":10,
        "dislikes":100,
        "downloads":10,
        "userName":"user3",
        "email":"user3@gmail.com",
        "editActive":null,
        "published":"2/3/2021",
        "imageUrl": ''
      }
    ];

    return (
      <Box className="home-container" sx={{marginLeft:'260px' }}>

        <Typography variant="h4" sx={{color:"white",marginTop:'1%',marginBottom:'2%'}}>Search Results for Fantasy</Typography>

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

          {mapCardInfo.map((map) => (
            <MapCard key={map.id} mapInfo={map} />
          ))}
        </Box>
      </Box>
    );
  }
  
  export default SearchResults;