import { Button, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import "../App.css"
import AuthContext from '../auth';
import "../literallycanvas.css"

import LC from "literallycanvas";

const TileSetEditor=() =>{

    const { store } = useContext(GlobalStoreContext)
    const {auth} = useContext(AuthContext)

   const imageAddr =
    "https://img.craftpix.net/2022/02/Green-Zone-Tileset-Pixel-Art2-720x480.jpg";
    var img = new Image();
    img.src = imageAddr;

    return (
      
      <Box className="tileset-container">
          <Box display="flex" sx={{height:"680px"}} >
            <LC.LiterallyCanvasReactComponent
              watermarkImage={img}
              imageURLPrefix="img">
            </LC.LiterallyCanvasReactComponent>
        </Box>
      </Box>
    );
  }
  
  export default TileSetEditor;