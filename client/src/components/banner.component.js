import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import bannerImage from '../assets/Playing computer game.png'
import { useNavigate } from "react-router-dom";
import "../App.css"
import AuthContext from '../auth';
import React, { useContext, useState } from 'react';
import LoginModal from './login-modal.component';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { useTheme } from '@mui/material/styles';
import collaborateImage from "../assets/collaborate.png"
import searchImage from "../assets/Flat Illustration1x.png"
import shareImage from "../assets/share.png"
import updateImage from "../assets/update profile.png"
import importExportImage from "../assets/Importexport.png"
import createImage from "../assets/create.png"


const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
    {
        label: 'Start creating your maps in the My Projects screen',
        imgPath: createImage,
    },  
    {
      label: 'Work together to create wonderful maps. Add team members in Map Editor page to share projects.',
      imgPath: collaborateImage,
    },
    {
      label: 'Export your maps as png or Json and continue your works in supported Apps like Tiled',
      imgPath: importExportImage,
    },
    {
      label: 'Publish your maps to show your creativity and get feedback and recommendations from other users.',
      imgPath: shareImage,
    },
    {
      label: "Search published maps by Name, Catagory or by your favorite creator's user name.",
      imgPath: searchImage,
    },
    {
      label: 'Let other users know who you are by adding profile picture, other account information can also be edited in the settings page',
      imgPath: updateImage,
    },
    
];

const HomeBanner = () => {
    const navigate = useNavigate();
    const theme = useTheme();
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
    

    
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = images.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    const nologgedInUserBanner = 
        <>
            <Box 
                m ={2}
                component="img"
                sx={{ height: 300, overflow: 'hidden'}}
                alt="banner Image"
                src ={bannerImage}
                
            />
            <Box  m={3} flexDirection="column" sx={{marginX: 10}} >
                <Typography variant="h3"  color="white"  sx= {{marginY: 3 ,fontWeight:'bold'}}> TILESLATE</Typography>
                <Typography color="white" > FIRST WEB APP IN THE WORLD<br/>WHERE GAME DEVELOPERS<br/>AND ARTISTS COLLECTIVELY<br/>BRING THEIR VISIONS TO LIFE.</Typography>
                <Button variant="outlined" size="large"  sx= {{borderColor:"white",color:"white",borderRadius:'10px',marginY: 3,fontSize:"16px"}} onClick={handleSignUp}>JOIN OUR COMMUNITY </Button>
            </Box>
        </>

    const loggedInUserBanner = 
        <>
             
                <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                    {theme.direction === 'rtl' ? (
                    <KeyboardArrowRight />
                    ) : (
                    <KeyboardArrowLeft />
                    )}
                </Button>
                
            <AutoPlaySwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
            >
                {images.map((step, index) => (
                <div key={step.label}>
                    {Math.abs(activeStep - index) <= 2 ? (
                    <Box
                        m = {2}
                        component="img"
                        sx={{
                        height: 300,
                        display: 'block',
                        maxWidth: 300,
                        overflow: 'hidden',
                        width: '100%',
                        }}
                        src={step.imgPath}
                        alt={step.label}
                    />
                    ) : null}
                </div>
                ))}
            </AutoPlaySwipeableViews>
            <Box  m={3} flexDirection="column" sx={{marginX: 10}} >
                
                    <Typography variant="h5" color="white" sx = {{marginY: 3 ,fontWeight:'bold'}} >{images[activeStep].label}</Typography>
                
            </Box>
            <Button
                    steps={maxSteps}
                    position="static"
                    activeStep={activeStep}
                    size="small"
                    onClick={handleNext}
                    disabled={activeStep === maxSteps - 1}
                >
                    
                    {theme.direction === 'rtl' ? (
                    <KeyboardArrowLeft />
                    ) : (
                    <KeyboardArrowRight />
                    )}
            </Button>
        </>
        
    

    const loginModal = modal ? <LoginModal message="You're already logged in!" onClose={handleModal}></LoginModal> : null;
    
    return(
       <Box className = 'homebanner' display="flex" sx = {{backgroundImage: 'linear-gradient(to right, #8B1310,#F83600, #ffc406)',borderRadius:'15px',justifyContent: 'center',maxWidth:"90%", height:320}}> 
       {loginModal}
       {!auth.loggedIn && nologgedInUserBanner}
       {auth.loggedIn && loggedInUserBanner}
         
        </Box>
    );

};

export default HomeBanner;
