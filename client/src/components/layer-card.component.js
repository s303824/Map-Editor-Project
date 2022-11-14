import { Grid, IconButton, ListItem, Typography } from "@mui/material";
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import { useContext } from 'react';
import { GlobalStoreContext } from '../store';



const LayerCard =({layerInfo})=>{
    const {store} = useContext(GlobalStoreContext);

    const handlesetCurrentLayer = (event) =>{
        event.preventDefault();
        store.setCurrentLayer(event.target);
    }
    
    return(
        <Grid container spacing={2} 
        sx={{backgroundImage:'linear-gradient(to right,#feaf06,#ffc806,#F7D24F)',
            boxShadow: `inset 0 0 3px rgba(0, 0, 0, 0.2)`,
            borderRadius:5,
            marginTop:1,marginLeft:3,
            maxWidth:"90%"}}>
        <Grid xs={1}>
            <IconButton aria-label="delete">
                <DeleteForeverTwoToneIcon sx={{fill:"white" ,fontSize:30}}/>
            </IconButton>
        </Grid>
        <Grid xs={6}  
            onClick={handlesetCurrentLayer}>
            <Typography sx={{color:"white",fontSize:20,marginTop:1,marginLeft:2}}>{layerInfo.name}</Typography>
        </Grid>
        <Grid xs={2}></Grid>
        </Grid>
    );

}

export default LayerCard;