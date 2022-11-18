import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import "../App.css"
import { useEffect } from 'react'
import AuthContext from '../auth';
import Typography from '@mui/material/Typography';
import MapCard from '../components/map-card.component';

const MyProjects=() =>{ 
    const { store } = useContext(GlobalStoreContext);
    const {auth} = useContext(AuthContext);

    useEffect(() => {
      auth.getLoggedIn();      
    }, []);

    useEffect(() => {
      if (auth.user !== null){
        store.loadUserMaps(auth.user.username);
      }
    }, [auth.user])

    const handleCreateNewProject = async () => {   

      let mapData = {
            compressionlevel: -1,
            backgroundcolor: "#100667",
            height: 20,
            infinite: false,
            layers: [
                {
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    height: 20,
                    id: 1,
                    name: "Tile Layer 1",
                    opacity: 1,
                    type: "tilelayer",
                    visible: true,
                    width: 30,
                    x: 0,
                    y: 0
                }],
            mapinfo: {
              ownerName: auth.user.username,
              email: auth.user.email,
              profile_picture: auth.user.profile_picture
            },
            nextlayerid: 2,
            nextobjectid: 1,
            orientation: "orthogonal",
            renderorder: "right-down",
            tiledversion: "1.9.2",
            tileheight: 32,
            tilesets: [],
            tilewidth: 32,
            type: "map",
            version: "1.9",
            width: 30
        }
      await store.setNewMap(mapData)
    }

    let mapList = 
    <Box>
      {store.userMaps.filter((map) => (
          map.published == "false"
        )).map((map) => (
          <MapCard key={map._id} mapInfo={map} />
        ))}  

      <Typography variant="h4" sx={{backgroundImage: 'linear-gradient(to top, lightgrey 0%, lightgrey 1%, #e0e0e0 26%, #efefef 48%, #d9d9d9 75%, #bcbcbc 100%)',borderRadius:'10px',justifyContent: 'center',maxWidth:"25%",color:"grey",marginTop:'3%',marginBottom:'2%',padding:'1%',fontSize:22}}> Published Maps </Typography>
        {store.userMaps.filter((map) => (
          map.published != "false"
        )).map((map) => (
          <MapCard key={map._id} mapInfo={map} />
        ))}
    </Box>

    if(store.userMaps.length == 0) {
      mapList = null;
    }
  
    return (
      <Box className="home-container" sx={{marginLeft:'260px' }}>
        <Typography variant="h4" sx={{borderRadius:'10px',justifyContent: 'center',maxWidth:"90%",color:"white",marginTop:'0%',marginBottom:'2%',padding:'0%',font: 'Bebas Neue'}}>My Projects</Typography>
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
        <Box display='flex' justifyContent='space-between' >
        <Button variant="h4" sx={{backgroundImage: 'linear-gradient(to top, lightgrey 0%, lightgrey 1%, #e0e0e0 26%, #efefef 48%, #d9d9d9 75%, #bcbcbc 100%)',boxShadow: '0 1px 1px 1px rgba(68,68,69,255)',boxShadow: 1,borderRadius:'10px',justifyContent: 'center',maxWidth:"30%",color:"grey",marginTop:'1%',marginRight:'3%',marginBottom:'2%',padding:'1%',fontSize:20}}onClick={handleCreateNewProject}> Create New Project </Button>
        </Box> 
        {mapList}
        </Box>
      </Box>
    );
  }
  
  export default MyProjects;