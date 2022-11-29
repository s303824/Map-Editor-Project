import Box from '@mui/material/Box';
import { useContext } from 'react';
import GlobalStoreContext from '../store';
import map from '../assets/map-card-7.jpg';

const Tile =(tileInfo)=>{
  const {id,value,row,column,img,tileWidth,tileHeight} = tileInfo;
  const {store} = useContext(GlobalStoreContext);
  //console.log("herererererererererer")
  //console.log(value)
  // const map = store.currentTileSet[0].image
  let left =0;
  let top = 0;
  let newImg = img;

  //THIS IS THE IMPORTANT PART RIGHT HERE:
  //currently i am directly changing the first gid of tileset[1] to 226
  //this checks if the value is above that, then uses the image from tileset[1]
  if(value > 225) {
    newImg = store.currentMap.tilesets[1].image
  }

  if(value != -1){
    if(value!=0){
   //let set = store.currentMap.tilesets.filter( tileset => value < (tileset.tilecount+tileset.firstgid ));
    let set = store.currentTileSet[0];
    if(set == undefined) {
      return <Box></Box>;
    }
    if(value < 226) {
      newImg = map
    }
    left = -(((value-(set.firstgid)) % (set.imagewidth/set.tilewidth))* tileWidth);
    top = -((Math.floor((value-(set.firstgid)) / (set.imageheight/set.tileheight))) * tileHeight);
  }
  }else{
    //console.log("herererererererererer")
    left = -((id % column)* tileWidth);
    top = -((Math.floor(id / row)) * tileHeight); 
  }

  
  const handleTileClick = (event) => {
    event.preventDefault();
    //to differentiate click coming from a tileset or a map container 
    
    if(event.target.parentElement.className.includes('tileset-section')){
      store.setCurrentTile(event.target.id,value);
    }else{
      //console.log("target",event);
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
      >
        </Box>   
        
    );

}

export default Tile