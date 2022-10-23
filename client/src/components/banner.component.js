import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import bannerImage from '../assets/Playing computer game.png'


const HomeBanner =() =>{
    return(
       <Box className = 'homebanner' display="flex" sx = {{backgroundImage: 'linear-gradient(to right, #8B1310,#F83600, #ffc406)',borderRadius:'20px',justifyContent: 'center',maxWidth:"90%"}}> 
         <Box 
            m ={2}
            component="img"
            sx={{ height: 250}}
            alt="banner Image"
            src ={bannerImage}
            />
        <Box  m={3} flexDirection="column" sx={{marginX: 7}} >
            <Typography variant="h3"  color="white"  sx= {{marginY: 3 ,fontWeight:'bold'}}> TILESLATE</Typography>
            <Typography color="white" > FIRST WEB APP IN THE WORLD IN WHICH <br/>GAME DEVELOPERS AND ARTISTS COLLECTIVELY  <br/>BRING THEIR VISIONS TO LIFE.</Typography>
            <Button variant="outlined" size="large"  sx= {{borderColor:"white",color:"white",borderRadius:'10px',marginY: 3,fontSize:"17px"}}>JOIN OUR COMMUNITY </Button>
        </Box>
        </Box>
    );

};

export default HomeBanner;
