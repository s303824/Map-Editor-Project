import Box from '@mui/material/Box';
import { useContext } from 'react';
import GlobalStoreContext from '../store';
import map from '../assets/map-card-7.jpg';

const Tile =(tileInfo)=>{
  const {id,value,row,column,img,tileWidth,tileHeight} = tileInfo;
  const {store} = useContext(GlobalStoreContext);

  let left =0;
  let top = 0;
  let newImg = img;

  if(value != -1){
    if(value!=0){
    let set = store.currentMap.tilesets.filter( tileset => value < (tileset.tilecount+tileset.firstgid ));
    newImg = map; 
    left = -(((value-(set[0].firstgid)) % (set[0].imagewidth/set[0].tilewidth))* tileWidth);
    top = -((Math.floor((value-(set[0].firstgid)) / (set[0].imageheight/set[0].tileheight))) * tileHeight);
  }
  }else{
    left = -((id % column)* tileWidth);
    top = -((Math.floor(id / row)) * tileHeight); 
  }

  
  const handleTileClick = (event) => {
    event.preventDefault();
    //to differentiate click coming from a tileset or a map container 
    if(event.target.parentElement.className.includes('tileset-section')){
      store.setCurrentTile(event.target.id,value);
    }else{
      store.handleMapAction(event.target.id,value);
    }
  } 
 
    return(
        <Box 
      id={id}
      sx={{
      height:`${tileHeight}px`,
      width:`${tileWidth}px`,
      backgroundImage: `url(${newImg})`,
      backgroundPosition:`left ${left}px top ${top}px`,
      border:"solid",
      margin:'0px'
    }}
    onClick = {handleTileClick}
      />   
        
    );

}

export default Tile;