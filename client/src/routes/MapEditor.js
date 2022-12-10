import { useContext, useEffect, useState} from 'react';
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import LayersSection from '../components/layers.component';
import TilesetsSection from '../components/tilesets-section.component';
import Layer from '../components/layer-component';
import { useNavigate } from 'react-router-dom';


const MapEditor=() =>{
    const { store } = useContext(GlobalStoreContext);
    const {auth} = useContext(AuthContext)
    const [id, setId] = useState(window.location.pathname.split("/")[2]);
    const navigate = useNavigate();
    //let layers = store.currentMap.layers;
    //let reverse = [...layers].reverse(); 

    useEffect(() => {
        if (store.currentMap.mapinfo == null){
          store.loadMapById(window.location.pathname.split("/")[2]);
        }
        else {
          store.currentMapInfo.creator.forEach(creator => {
            if(creator.creator != auth.user.username) {
              navigate("/", {})
            }
          })
        }

        //for going back
        window.addEventListener('popstate', (event) => {
          console.log("going back")
          // Cancel the event as stated by the standard.
          event.preventDefault();
          // Chrome requires returnValue to be set.
          event.returnValue = '';
          store.setEditActive(id, false);
        }); 


        window.addEventListener('beforeunload', alertUser)
        window.addEventListener('unload', handleTabClosing)
        return () => {
          window.removeEventListener('beforeunload', alertUser)
          window.removeEventListener('unload', handleTabClosing)
      }

      }, []);   

      if(auth.user == null) {
        navigate("/", {})
      }


      //this SHOULD be called when tab is closed but isnt
      const handleTabClosing = () => {
        console.log("FSd")
        store.setEditActive(id, false)
    }
    
    //called before tab is closed with a popup
    const alertUser = (event) => {
      store.setEditActive(id, false)
      event.preventDefault()
      event.returnValue = ''
      console.log("pop")
    }

    function sleep(delay) {
      var start = new Date().getTime();
      while (new Date().getTime() < start + delay);
    }

    console.log(store.currentMap)

    return(
        <Box className="map-editor-container" >
          <Grid container spacing={1}>
            <Grid xs={8} sx={{backroundColor:'white'}}>
            <Layer/>
               
            </Grid>
            <Grid xs={4} >
            <LayersSection/>
            <TilesetsSection/>
            </Grid> 
          </Grid>
        </Box>
    );
};

export default MapEditor;