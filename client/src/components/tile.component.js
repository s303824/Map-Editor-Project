import Box from '@mui/material/Box';
import { useContext } from 'react';
import GlobalStoreContext from '../store';



const Tile =(tileInfo)=>{
  const {id,row,column,img,tileWidth,tileHeight} = tileInfo;
  const {store} = useContext(GlobalStoreContext);

  const left = -((id % column)* tileWidth);
  const top = -((Math.floor(id / row)) * tileHeight);


  const handleTileClick = (event) => {
    event.preventDefault();

    if(event.target.parentElement.className.includes('tileset-section')){
      store.setCurrentTile(event.target.id);
    }else{
      store.handleMapAction(event.target.id);
    }
  } 
  
    return(
        <Box 
      id={id}
      sx={{
      height:`${tileHeight}px`,
      width:`${tileWidth}px`,
      backgroundImage: `url(${img})`,
      backgroundPosition: `left ${left}px top ${top}px`,
      border:"solid",
      margin:'0px'
    }}
    onClick = {handleTileClick}
      />   
        
    );

}

export default Tile;