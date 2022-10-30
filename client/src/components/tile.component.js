import { imageListClasses, List, ListItem} from '@mui/material';
import { Button, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import LayerCard from './layer-card.component';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import ArrowCircleDownTwoToneIcon from '@mui/icons-material/ArrowCircleDownTwoTone';
import ArrowCircleUpTwoToneIcon from '@mui/icons-material/ArrowCircleUpTwoTone';
import Typography from '@mui/material/Typography';
import candles from '../assets/map-card.jpg';


const Tile =(tileInfo)=>{
  const {id,imageSize,img,tileWidth} = tileInfo;
  
  const row = 10;
  const column = 10;
  const left = -(id % column)* tileWidth;
  const top = -(Math.floor(id / row)) * tileWidth;

    return(
        <Box 
      sx={{
      height:`${tileWidth}px`,
      width:`${tileWidth}px`,
      backgroundImage: `url(${img})`,
      backgroundPosition: `left ${left}px top ${top}px`,
      border:"solid",
      margin:'0px'
    }}
      />   
        
    );

}

export default Tile;