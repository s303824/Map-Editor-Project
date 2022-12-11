import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import "../App.css"
import { useEffect } from 'react'
import AuthContext from '../auth';
import Typography from '@mui/material/Typography';
import MapCard from '../components/map-card.component';
import { useNavigate } from 'react-router-dom';
import LoginModal from '../components/login-modal.component';

const MyProjects=() =>{ 
    const { store } = useContext(GlobalStoreContext);
    const {auth} = useContext(AuthContext);

    useEffect( () => {
       auth.getLoggedIn();    

       if (auth.user !== null){
        store.loadUserMaps(auth.user.username);
      }
    }, [auth.user]);

    const [sneaker, setSneaker] = useState(false)

    const handleCreateNewProject = async () => {   
      if(auth.user == null) {
        setSneaker(true)
        return;
      }

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
            tileheight: 64,
            tilesets: [{
                          _id: 1,
                          backgroundcolor: "#d31313",
                          columns : 960/64,
                          fillmode: "stretch",
                          firstgid: 1 ,
                          grid: {},
                          image: 'https://res.cloudinary.com/natialemu47/image/upload/v1669851225/Tileslate/map-card-7_xhnvme.jpg',
                          imageheight: "960",
                          imagewidth: "960",
                          margin: 0,
                          name: "Sample Tileset",
                          objectalignment: "top",
                          properties:[{
                                      name:"SourceWebsite",
                                      type:"string",
                                      value:"tileslate.herokuapp.com"
                                      }],
                          source : "",
                          tilecount: 225,
                          tileslateversion: "1.0.1",
                          tileheight: 64,
                          tilerendersize: "10",
                          tiles : [],
                          tilewidth: 64,
                          transparentcolor :  "#000000",
                          type : "tileset",
                          version : "1.1",
                          wangsets: []
                      }],
            tilewidth: 64,
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

      <Typography variant="h4" sx={{justifyContent: 'center',maxWidth:"25%",color:"white",marginTop:'3%',marginBottom:'2%',padding:'1%',fontSize:22,font: 'Bebas Neue'}}> Published Maps </Typography>
        {store.userMaps.filter((map) => (
          map.published != "false"
        )).map((map) => (
          <MapCard key={map._id} mapInfo={map} />
        ))}
    </Box>

    if(store.userMaps.length == 0) {
      mapList = <Box className="loading"></Box>
    }
    if(auth.user != undefined) {
      if(auth.user.myprojects.length == 0 ){
        mapList = <Box><Typography sx={{color:"white", fontSize:18}}>You have not created any maps yet!</Typography></Box>
      }
    }

    let sneakyModal = sneaker ? <LoginModal message="How did you get here you little sneaky guy? Get outta here" onClose={() => setSneaker(false)}></LoginModal> : null
  
    return (
      <Box className="home-container" sx={{marginLeft:'260px' }}>
        {sneakyModal}
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
        <Button variant="h4" sx={{backgroundImage: 'linear-gradient(to right,#F83600, #ffc406)',borderRadius:'10px',justifyContent: 'center',maxWidth:"30%",color:"white",marginTop:'1%',marginRight:'3%',marginBottom:'2%',padding:'1%',fontSize:20, fontWeight:"bold",font: 'Bebas Neue'}}onClick={handleCreateNewProject}> Create New Project </Button>
        </Box> 
        {mapList}
        </Box>
      </Box>
    );
  }

  export default MyProjects;