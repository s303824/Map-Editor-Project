import { List, ListItem} from '@mui/material';
import { Button, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import LayerCard from '../components/layer-card.component';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import ArrowCircleDownTwoToneIcon from '@mui/icons-material/ArrowCircleDownTwoTone';
import ArrowCircleUpTwoToneIcon from '@mui/icons-material/ArrowCircleUpTwoTone';
import Typography from '@mui/material/Typography';
import { useContext,useState } from 'react';
import { GlobalStoreContext } from '../store';

const LayersSection =()=>{
    const {store} = useContext(GlobalStoreContext);
    let currentLayer= store.currentLayer;

    console.log("current",currentLayer);
    //sort the layers based on their precedence
    //const sortedByPredence = (store.currentMap.layers.sort((a, b) => a.precedence - b.precedence)); 

    const handleAddLayerButton = (event) => {
        event.preventDefault();
        store.addNewLayer();
    }

    const handleIncreasePredence = (event) => {
        event.preventDefault();
        store.increaseLayerPrecedence();
    }

    const handleDecreasePredence = (event) => {
        event.preventDefault();
        store.decreaseLayerPrecedence();
    }

    

    return(
        <Grid sx={{backgroundImage :'linear-gradient(to left, #505051, #303031)',boxShadow: '0 1px 2px 2px rgba(68,68,69,255)',borderRadius:2}}>
            <Grid >
                <Box sx={{display:"flex",justifyContent:"space-between"}}>
                    <Typography sx={{color:"white",fontSize:20,fontWeight:"bold",marginTop:2,marginLeft:3}}>LAYERS</Typography>
                    <Button variant="contained" endIcon={<AddCircleTwoToneIcon />} 
                        sx={{backgroundColor:"#d72b05",
                        boxShadow: '0 2px 4px 2px rgba(68,68,69,255)',
                        marginRight:3,
                        marginTop:1}}
                        onClick = {handleAddLayerButton}
                        >
                        Add
                    </Button>
                </Box>
                
                <Grid sx={{backgroundColor:'#B8B8B8',boxShadow: `inset 0 0 6px rgba(0, 0, 0, 0.3)`,marginTop:3,marginBottom:1,marginLeft:3,marginRight:3,borderRadius:2,height:"250px",
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
                <List sx={{backroundColor:"#E0E0E0"}} >{
                        store.currentMap.layers.map((layer) => (
                        <LayerCard
                        id={layer.id}
                        layerInfo={layer}
                        selected={currentLayer.id == layer.id ? true : false}
                        />
                        ))}
                 </List>
                </Grid>
            </Grid>
            <Box  display="flex " justifyContent="flex-end" sx={{marginRight:4}}>
                <IconButton aria-label="increase precedence" onClick ={handleIncreasePredence}>
                    <ArrowCircleUpTwoToneIcon sx={{fill:"white" ,fontSize:35}}/>
                </IconButton>
                 <IconButton aria-label="decrease precedence" onClick ={handleDecreasePredence}>
                    <ArrowCircleDownTwoToneIcon sx={{fill:"white" ,fontSize:35}}/>
                </IconButton>

            </Box>
        <Grid >
     </Grid>
 </Grid>
    );

}

export default LayersSection;