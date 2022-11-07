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
import map from '../assets/map-card.jpg';
import GlobalStoreContext from '../store';
import { useContext } from 'react';

const Tileset =()=>{
  const {store} = useContext(GlobalStoreContext);
  const tileset = store.currentTileSet;
  
  const column = tileset.imagewidth/tileset.tilewidth;
  const row = tileset.imageheight/tileset.tileheight;
  
    return(
      <Box>
        <ImageList 
          cols={column} 
          gap={0} 
          sx={{
            backgroundColor:'#B8B8B8',
            boxShadow: `inset 0 0 6px rgba(0, 0, 0, 0.3)`,
            marginTop:0,
            marginBottom:1,
            marginLeft:3,
            marginRight:3,
            borderRadius:2,
            height:"250px",
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
          {Array.from({ length: tileset.tilecount }, (_, i) => (
          <Tile id={i} row={row} column={column} img={map} tileWidth = {tileset.tilewidth} tileHeight={tileset.tileheight}/>
      ))}
      </ImageList>
    </Box>
     
    );

}

export default Tileset;