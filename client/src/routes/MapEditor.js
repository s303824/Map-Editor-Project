import { useContext, useEffect, useState} from 'react';
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import LayersSection from '../components/layers.component';
import TilesetsSection from '../components/tilesets-section.component';
import Layer from '../components/layer-component';

const MapEditor=() =>{
    const { store } = useContext(GlobalStoreContext);
    const {auth} = useContext(AuthContext)
    const [id, setId] = useState(store.currentMap.mapinfo);

    useEffect(() => {
        if (store.currentMap.mapinfo == null){
          store.loadMapById(window.location.pathname.split("/")[2]);
          setId(window.location.pathname.split("/")[2])
        }
        window.addEventListener('beforeunload', handleUnload)
        return () => {
          window.removeEventListener('beforeunload', handleUnload)
          handleUnload()
        }
      }, [])

    const handleUnload = () => {
      console.log("Leaving Page")
      console.log(id)
      store.setEditActive(id, false)
    }

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