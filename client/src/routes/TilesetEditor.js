import { Button, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import "../App.css"
import AuthContext from '../auth';
import { saveAs } from 'file-saver'
import 'tui-image-editor/dist/tui-image-editor.css';
import ImageEditor from '@toast-ui/react-image-editor';

const TileSetEditor=() =>{

  const { store } = useContext(GlobalStoreContext)
  const {auth} = useContext(AuthContext)
  
  let imagePath
  if (store.currentTileSet.length === 0){ 
    // when page refreshes and if currentTileSet is empty uses white background for imagePath
      imagePath = "https://res.cloudinary.com/natialemu47/image/upload/v1667096203/Tileslate/layer-backround_sr6ida.jpg"
    
  }else{ 
    imagePath = store.currentTileSet[0].image
  }

  useEffect(() => {
    if (store.currentTileSet.length === 0){
      store.loadMapById(window.location.pathname.split("/")[2]);  
    }
  },[])


  return (
    
    <Box className="tileset-container">
    
        <Box display="flex" sx={{height:"680px"}} >
          <ImageEditor
                  includeUI={{
                      loadImage: {
                      path: imagePath,
                      name: 'SampleImage',
                      },
                      menu: ['shape', 'filter', 'draw'],
                      initMenu: 'filter',
                      uiSize: {
                      width: '100%',
                      height: '100%',
                      },
                      menuBarPosition: 'right',
                  }}
                  cssMaxHeight={1100}
                  cssMaxWidth={900}
                  selectionStyle={{
                      cornerSize: 20,
                      rotatingPointOffset: 70,
                  }}
                  usageStatistics={true}
              />
          
          
      </Box>
    
    </Box>
  );
};

export default TileSetEditor;