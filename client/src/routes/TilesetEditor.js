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
    "https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png";
    var img = new Image();
    img.src = imageAddr;

    return (
      <Box sx={{backgroundColor:"white" ,marginLeft:1,marginRight:1,marginTop:1}}>
        <Box display="flex" sx={{height:"680px"}} >
        <LC.LiterallyCanvasReactComponent
          watermarkImage={img}
          imageURLPrefix="img">
        </LC.LiterallyCanvasReactComponent>
        box
        </Box>
      </Box>
    );
  }
  
  export default TileSetEditor;