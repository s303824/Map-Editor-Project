import { Button, IconButton, ImageList, ImageListItem } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import LayerCard from '../components/layer-card.component';
import LayersSection from '../components/layers.component';
import TilesetsSection from '../components/tilesets-section.component';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import ArrowCircleDownTwoToneIcon from '@mui/icons-material/ArrowCircleDownTwoTone';
import ArrowCircleUpTwoToneIcon from '@mui/icons-material/ArrowCircleUpTwoTone';
import Tile from '../components/tile.component';
import Tileset from '../components/tileset-cards.component';
import Layer from '../components/layer-component';
import map from '../assets/map-card.jpg';


const MapEditor=() =>{
    const { store } = useContext(GlobalStoreContext);
    const {auth} = useContext(AuthContext);

    if(auth.user == null) {
        return null;
    }
    store.loadUserMaps(auth.user.username);
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