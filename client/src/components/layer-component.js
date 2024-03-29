import { List, ListItem,ImageList} from '@mui/material';
import { Button, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import LayerCard from '../components/layer-card.component';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import ArrowCircleDownTwoToneIcon from '@mui/icons-material/ArrowCircleDownTwoTone';
import ArrowCircleUpTwoToneIcon from '@mui/icons-material/ArrowCircleUpTwoTone';
import Typography from '@mui/material/Typography';
import Tile from './tile.component';
import LayerTileBackround from "../assets/layer-backround.jpg";
import { useContext } from 'react';
import { GlobalStoreContext } from '../store';

const Layer =(layer)=>{
  const {store} = useContext(GlobalStoreContext);
  // console.log(store.currentMap)
  if(!store.currentMap.tileheight) {
    return null;
  }
  let currentLayer = store.currentLayer[0];
  // console.log(store.currentMap)
  // console.log("currentlayer",store.currentLayer);
  const tileCount = currentLayer.height * currentLayer.width;
  const tileWidth = store.currentMap.tilewidth;
  const tileHeight = store.currentMap.tileheight;

  let tilesets = store.tilesets;
  let layers = store.currentMap.layers;
  let reverse = [...layers].reverse(); 
  let canvas = new Array(tileCount).fill(0);

  reverse.map((layer) => (
    layer.data.map((value,index) => ( 
      value > 0 ? canvas[index]=value : null
 ))
))
 
  //should have the total tile count in the 
  //should just render layer.data array

  //THIS IS THE IMPORTANT CHANGE:
  //hard coded tileset[1] to have this first gid
  // store.currentMap.tilesets[1].firstgid = 226

    return(
      <Box>
        <ImageList 
          cols={currentLayer.width} 
          gap={0} 
          sx={{
            backgroundColor:'#B8B8B8',
            boxShadow: `inset 0 0 6px rgba(0, 0, 0, 0.3)`,
            marginTop:2,
            marginLeft:2,
            marginRight:0,
            borderRadius:2,
            maxHeight:"880px",
            overflowY:'scroll', 
                "&::-webkit-scrollbar": {
                width: 10,},
            "&::-webkit-scrollbar-track": {
                boxShadow: `inset 0 0 6px rgba(0, 0, 0, 0.3)`,
            },
            "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#ffc806",
                outline: `1px solid #ffc806`,
            }}}>

      {canvas.map((value,index) => (
          <Tile id={index}  value={value} row={currentLayer.height} column={currentLayer.width} img={LayerTileBackround} tileWidth = {tileWidth} tileHeight={tileHeight} /> 
      ))}

      </ImageList>
    </Box>
     
    );

}

export default Layer;