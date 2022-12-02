import { Button, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import "../App.css"
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'
import AuthContext from '../auth';
import "../literallycanvas.css"

import LC from "literallycanvas";

function LiterallyCanvasTest() {

    const { store } = useContext(GlobalStoreContext)
    const {auth} = useContext(AuthContext)

    const imageAddr =
    "https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png";
    var img = new Image();
    img.src = imageAddr;

    const generateBackgroundShapes = () => {
      let backgroundImage = new Image();
      backgroundImage.src =  imageAddr;
  
      const backgroundShapes = [
        LC.createShape("Image", { image: backgroundImage })
      ];
      const shapes = LC.snapshotToShapes(backgroundSnapshot);
      if (shapes) {
        return backgroundShapes.concat(shapes);
      }
      return backgroundShapes;
    };


    return (
      <Box >
        <LC.LiterallyCanvasReactComponent
          watermarkImage={img}
          onInit={handleInit}
          snapshot={snapshot}
          backgroundShapes={generateBackgroundShapes()}
          imageURLPrefix="img">
          
        </LC.LiterallyCanvasReactComponent>
      </Box>
    );
  }
  
  export default LiterallyCanvasTest;