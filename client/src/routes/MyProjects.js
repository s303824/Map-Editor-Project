import { Button, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import "../App.css"
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'
import AuthContext from '../auth';
import HomeBanner from '../components/banner.component';
import Typography from '@mui/material/Typography';
import MapCard from '../components/map-card.component';
import List from '@mui/material/List';
import mapImage from '../assets/map-card.jpg';
import { useNavigate } from "react-router-dom";


const MyProjects=() =>{ 
    const { store } = useContext(GlobalStoreContext);
    const {auth} = useContext(AuthContext);

    const mapCardInfo = [ //to display sample data 
      {
        "id": 1,
        "name": "Game1",
        "description":"",
        "likes":0,
        "dislikes":0,
        "downloads":0,
        "userName":"user4",
        "email":"user4@gmail.com",
        "editActive":"true",
        "published":null,
        "imageUrl":''
      },
      {
        "id": 2,
        "name": "Game2",
        "description":"",
        "likes":0,
        "dislikes":0,
        "downloads":0,
        "userName":"user4",
        "email":"user4@gmail.com",
        "editActive":null,
        "published":null,
        "imageUrl": ''
      },
      {
        "id": 3,
        "name": "Game3",
        "description":"#hastag3",
        "likes":10,
        "dislikes":100,
        "downloads":10,
        "userName":"user4",
        "email":"user4@gmail.com",
        "editActive":null,
        "published":"2/3/2021",
        "imageUrl": ''
      },
      {
        "id": 4,
        "name": "Game4",
        "description":"#hastag3",
        "likes":10,
        "dislikes":100,
        "downloads":10,
        "userName":"user4",
        "email":"user4@gmail.com",
        "editActive":null,
        "published":"2/4/2021",
        "imageUrl": ''
      }
    ];
    const navigate = useNavigate();

    const handleEdits = () => {
      navigate("/editor")
    }
  
  
    return (
      <Box className="home-container" sx={{marginLeft:'260px' }}>
        <Typography variant="h4" sx={{backgroundImage: 'linear-gradient(to top, lightgrey 0%, lightgrey 1%, #e0e0e0 26%, #efefef 48%, #d9d9d9 75%, #bcbcbc 100%)',boxShadow: '0 1px 1px 1px rgba(68,68,69,255)',boxShadow: 1,borderRadius:'10px',justifyContent: 'center',maxWidth:"90%",color:"grey",marginTop:'1%',marginBottom:'2%',padding:'2%'}}>My Projects</Typography>
        
        <Box 
          className="mapcard-container" 
          sx={{ 
            overflow: 'scrool',
            maxHeight:"500px",
            overflowY:'scroll',
            width:"90%",
            "&::-webkit-scrollbar": {
              width: 10,
            },
            "&::-webkit-scrollbar-track": {
              boxShadow: `inset 0 0 6px rgba(0, 0, 0, 0.3)`,
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#ffc806",
              outline: `1px solid #ffc806`,
            }}}>
        <Box display='flex' justifyContent='space-between' >
        <Button variant="h4" sx={{backgroundImage: 'linear-gradient(to top, lightgrey 0%, lightgrey 1%, #e0e0e0 26%, #efefef 48%, #d9d9d9 75%, #bcbcbc 100%)',boxShadow: '0 1px 1px 1px rgba(68,68,69,255)',boxShadow: 1,borderRadius:'10px',justifyContent: 'center',maxWidth:"30%",color:"grey",marginTop:'1%',marginBottom:'2%',padding:'1%',fontSize:22}} onClick={handleEdits}> Continue Editing </Button>
        <Button variant="h4" sx={{backgroundImage: 'linear-gradient(to top, lightgrey 0%, lightgrey 1%, #e0e0e0 26%, #efefef 48%, #d9d9d9 75%, #bcbcbc 100%)',boxShadow: '0 1px 1px 1px rgba(68,68,69,255)',boxShadow: 1,borderRadius:'10px',justifyContent: 'center',maxWidth:"30%",color:"grey",marginTop:'1%',marginRight:'3%',marginBottom:'2%',padding:'1%',fontSize:20}}onClick={handleEdits}> Create A New Project + </Button>
        </Box> 
        {mapCardInfo.filter((map) => (
            map.published == null
          )).map((map) => (
            <MapCard key={map.id} mapInfo={map} />
          ))}  

        <Typography variant="h4" sx={{backgroundImage: 'linear-gradient(to top, lightgrey 0%, lightgrey 1%, #e0e0e0 26%, #efefef 48%, #d9d9d9 75%, #bcbcbc 100%)',borderRadius:'10px',justifyContent: 'center',maxWidth:"25%",color:"grey",marginTop:'3%',marginBottom:'2%',padding:'1%',fontSize:22}}> Published Maps </Typography>
          {mapCardInfo.filter((map) => (
            map.published !=null
          )).map((map) => (
            <MapCard key={map.id} mapInfo={map} />
          ))}
        </Box>
      </Box>
    );
  }
  
  export default MyProjects;