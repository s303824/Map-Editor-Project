import { Button, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import "../App.css"
import AuthContext from '../auth';
import "../literallycanvas.css"
import { saveAs } from 'file-saver'
import { LiterallyCanvasReactComponent } from 'literallycanvas';

import LC from "literallycanvas";

const TileSetEditor=() =>{

    const { store } = useContext(GlobalStoreContext)
    const {auth} = useContext(AuthContext)
    console.log(document.getElementsByClassName('lc-drawing')[0])
  
    const handledownload = (img) => {
      // var lc = LC.init(document.getElementsByClassName('lc-drawing')[0]);
      // console.log(LC.getImage())  
      // LC.renderSnapshotToImage()
      // window.open(LC.renderSnapshotToImage())
      // saveAs(LC.renderSnapshotToImage(), 'Tileset.jpg') 
      // window.open(getImage().toDataURL());
    }
    let image
    if (store.currentTileSet.length === 0){
      image =  "https://res.cloudinary.com/natialemu47/image/upload/v1667096203/Tileslate/layer-backround_sr6ida.jpg"
    }else{ 
      image = store.currentTileSet[0].image
    }

    useEffect(() => {
      if (store.currentTileSet.length === 0){
        store.loadMapById(window.location.pathname.split("/")[2]);  
      }
    },[])
  

   const imageAddr = image;
    var img = new Image();
    img.src = imageAddr;

    return (
      
      <Box className="tileset-container">
          <Box display="flex" sx={{height:"680px"}} >
            <LC.LiterallyCanvasReactComponent
              watermarkImage={img}
              imageURLPrefix="img"
              className = "literally export"
              >
            </LC.LiterallyCanvasReactComponent>
        </Box>
        {/* <Button onClick={handledownload(img)}>download</Button> */}
      </Box>
    );
  }
  
  export default TileSetEditor;