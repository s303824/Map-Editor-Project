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
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imagePath, setImagePath] = useState("")
  

  useEffect(() => {
    const loadMap = async () => {
      let ts = (await store.loadMapById(window.location.pathname.split("/")[2]));
      setImagePath(ts[0].image)
      setImageLoaded(true)
    }
    
    loadMap();

  },[])

  let editor = !imageLoaded ? <Box className="loading"></Box> : <ImageEditor
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


  return (
    
    <Box className="tileset-container">   
        <Box display="flex" sx={{height:"680px"}} >
          {editor}        
      </Box>
    </Box>
  );
};

export default TileSetEditor;