import { List, ListItem,Tabs,Tab} from '@mui/material';
import { Button, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import LayerCard from '../components/layer-card.component';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import ArrowCircleDownTwoToneIcon from '@mui/icons-material/ArrowCircleDownTwoTone';
import ArrowCircleUpTwoToneIcon from '@mui/icons-material/ArrowCircleUpTwoTone';
import Typography from '@mui/material/Typography';
import candles from '../assets/map-card.jpg';
import Tileset from './tileset-cards.component';
import map from '../assets/map-card.jpg'

const TilesetsSection =()=>{
    const tilesets =[{ //to display sample data
        "id": 1,
        "name":"Layer1",
        "precedence":1,
      },
      {
        "id": 2,
        "name":"Layer2",
        "precedence":2,
      },
      {
        "id": 3,
        "name":"Layer3",
        "precedence":3,
      }
    
    ]

    return(
        <Grid sx={{backgroundImage :'linear-gradient(to left, #505051, #303031)',boxShadow: '0 1px 2px 2px rgba(68,68,69,255)',borderRadius:2}}>
            <Grid >
                <Box sx={{display:"flex",justifyContent:"space-between"}}>
                    <Typography sx={{color:"white",fontSize:20,fontWeight:"bold",marginTop:2,marginLeft:3}}>TILESETS</Typography>
                    <Button variant="contained" endIcon={<AddCircleTwoToneIcon />} sx={{backgroundColor:"#d72b05",boxShadow: '0 2px 4px 2px rgba(68,68,69,255)',marginRight:3,marginTop:1}}>
                        Add
                    </Button>
                </Box>

                <Tabs
                variant="scrollable"
                scrollButtons={false}
                aria-label="scrollable prevent tabs example"
                sx={{backgroundImage:'linear-gradient(to bottom,#7A7A7B,#7A7A7B)',boxShadow: `inset 0 0 6px rgba(0, 0, 0, 0.3)`,marginLeft:3,marginLeft:3,
                marginRight:3,
                marginTop:2,
                borderRadius:1,}}
                >
                
                    {tilesets.map((layer) => (
                        <Box display='flex' sx={{backgroundImage:'linear-gradient(to top, lightgrey 0%, lightgrey 1%, #e0e0e0 26%, #efefef 48%, #d9d9d9 75%, #bcbcbc 100%)',borderRadius:2,width:"145px",marginRight:1.5}}>
                        <Tab label={layer.id} sx={{

                            backgroundColor:'#696969',
                            width:"25px"}} />
                        <Button variant="contained"  sx={{backgroundColor:"#d72b05" ,fontSize:12,borderRadius:1,marginLeft:-1 }}>
                            Edit
                        </Button>
                        </Box>
                    ))}
                </Tabs>
            <Tileset/>
            </Grid>
                
        <Grid >
     </Grid>
 </Grid>
    );

}

export default TilesetsSection;