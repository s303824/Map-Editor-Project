import Box from '@mui/material/Box';
import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import "../App.css"
import { useEffect } from 'react'
import AuthContext from '../auth';
import HomeBanner from '../components/banner.component';
import Typography from '@mui/material/Typography';
import MapCard from '../components/map-card.component';
import { TextField } from '@mui/material';


function Home() {
    const { store } = useContext(GlobalStoreContext);
    const {auth} = useContext(AuthContext);
    const [page, setPage] = useState(1);
    const [maps, setMaps] = useState(null)

    useEffect(() => {
      const getData = async () => {
        setMaps(await store.getMapInfosSortedByLikes(page));
      }

      getData();
    }, [])

    const handleTextField = (event) => {
      if(isNaN(event.target.value) || event.target.value.includes(" ") || parseInt(event.target.value) > 99 ||  parseInt(event.target.value) < 0) {
        return;
      }
      setPage(event.target.value)
    }


    const handleEnterPress = (event) => {

      if(event.key == "Enter") {

        if(page == "" || page < 1 || page > 99) {
          setPage(1)
        }

        loadPage();
      }
    }

    const loadPage = async() => {
      setMaps(await store.getMapInfosSortedByLikes(page))
    }

    let currentMaps = maps != null ?
                      maps.length == 0 ?
                      <Box sx={{color:"white", fontSize:18}}>There are no maps on this page!</Box>
    : 
    <Box 
    className="mapcard-container" 
    sx={{ 
      height:"44vh",
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
  </Box> :
  <Box className="loading"></Box>

    return (
      <Box className="home-container" sx={{marginLeft:'260px' }}>
        <HomeBanner/>
        <Box sx={{display:"flex", flexDirection:"row", justifyContent:"space-between", marginTop:1}}>
          <Typography variant="h4" sx={{color:"white",font:'Bebas Neue',marginTop:'0%',marginBottom:'0%'}}>Most Popular Maps</Typography>
          <Box sx={{display:"flex", flexDirection:"row", justifyContent:"flex-end", marginRight:"10%"}}>
            <Typography variant="h3" sx={{color:"white", fontSize:18, marginTop:"5%"}}>Page Number: </Typography>
            <TextField value={page} sx={{backgroundColor:"lightgray", borderRadius:6, width:"13.5%", height:"88.5%", marginLeft:1}} 
            onChange={(event) => handleTextField(event)} onKeyDown={(event) => handleEnterPress(event)}></TextField>
          </Box>
        </Box>
        {currentMaps}
      </Box>
    );
  }
  
  export default Home;