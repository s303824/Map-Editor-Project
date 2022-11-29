import Box from '@mui/material/Box';
import { useContext } from 'react';
import GlobalStoreContext from '../store';
import map from '../assets/map-card-7.jpg';

const Tile =(tileInfo)=>{
  const {id,value,row,column,img,tileWidth,tileHeight, isTileset} = tileInfo;
  const {store} = useContext(GlobalStoreContext);

  let left =0;
  let top = 0;
  let newImg = img;
  let opasity = 1;

  if(value != -1){  //rendering a layer tile 
    if(value!=0){   
   //let set = store.currentMap.tilesets.filter( tileset => value < (tileset.tilecount+tileset.firstgid ));
    let set = store.currentTileSet;
    newImg = map; 
    left = -(((value-(set.firstgid)) % (set.imagewidth/set.tilewidth))* tileWidth);
    top = -((Math.floor((value-(set.firstgid)) / (set.imageheight/set.tileheight))) * tileHeight);

  }else{
    opasity = 0;
  }
  }else{ //rendering a tileset tile
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

  let highlightedColor = store.currentTile ? 
      store.currentTile.id == id && isTileset? 
      "white" : "" 
    : ""
 
    return(
        <Box 
      id={id}
      sx={{
      height:`${tileHeight}px`,
      width:`${tileWidth}px`,
      backgroundImage: `url(${newImg})`,
      backgroundPosition:`left ${left}px top ${top}px`,
      opacity: {opasity},
      border:"solid",
      margin:'0px',
      color:highlightedColor
    }}
    onClick = {handleTileClick}
      />   
        
    );

}

export default Tile