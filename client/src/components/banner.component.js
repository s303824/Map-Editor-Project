import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import bannerImage from '../assets/Playing computer game.png'
import { useNavigate } from "react-router-dom";
import "../App.css"
import AuthContext from '../auth';
import { useContext, useState } from 'react';
import LoginModal from './login-modal.component';


const HomeBanner =() =>{
    const navigate = useNavigate();
    const {auth} = useContext(AuthContext);
    const [modal, setModal] = useState(false)

    const handleSignUp = () => {
        if(auth.loggedIn) {
            setModal(true);
            return;
        }
        navigate("/signup")
      }

    const handleModal = () => {
        setModal(false)
    }

    const loginModal = modal ? <LoginModal message="You're already logged in!" onClose={handleModal}></LoginModal> : null;
    
    return(
       <Box className = 'homebanner' display="flex" sx = {{backgroundImage: 'linear-gradient(to right, #8B1310,#F83600, #ffc406)',borderRadius:'15px',justifyContent: 'center',maxWidth:"90%"}}> 
       {loginModal}
         <Box 
            m ={2}
            component="img"
            sx={{ height: 300}}
            alt="banner Image"
            src ={bannerImage}
            />
        <Box  m={3} flexDirection="column" sx={{marginX: 10}} >
            <Typography variant="h3"  color="white"  sx= {{marginY: 3 ,fontWeight:'bold'}}> TILESLATE</Typography>
            <Typography color="white" > FIRST WEB APP IN THE WORLD<br/>WHERE GAME DEVELOPERS<br/>AND ARTISTS COLLECTIVELY<br/>BRING THEIR VISIONS TO LIFE.</Typography>
            <Button variant="outlined" size="large"  sx= {{borderColor:"white",color:"white",borderRadius:'10px',marginY: 3,fontSize:"16px"}} onClick={handleSignUp}>JOIN OUR COMMUNITY </Button>
        </Box>
        </Box>
    );

};

export default HomeBanner;
