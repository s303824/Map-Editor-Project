import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import userImage from '../assets/userimage.png';
import ThumbUpTwoToneIcon from '@mui/icons-material/ThumbUpTwoTone';
import ThumbDownTwoToneIcon from '@mui/icons-material/ThumbDownTwoTone';
import DownloadForOfflineTwoToneIcon from '@mui/icons-material/DownloadForOfflineTwoTone';
import mapImage from '../assets/map-card.jpg'
import UserCard from './user-card.component';


const MapCard = ({mapInfo}) => {

 const {name,description,likes,dislikes,downloads,userName,email,editActive,published,imageUrl} = mapInfo;
 let width;
 {published ? width='80%': width='60%'}

  return (
    <Box sx={{ display:'flex' ,marginTop:"2%",width:{width},backgroundImage :'linear-gradient(to bottom, #505051, #303031)',boxShadow: '0 1px 2px 2px rgba(68,68,69,255)',borderRadius:"15px"}}>
            <Box 
                m ={2}
                component="img"
                sx={{ height: 140 }}
                 alt="map Image"
                src={mapImage}
            />
    
     <Box sx={{ display: 'flex',width:'100%',flexDirection: 'column'}}>
        
         <Box className = "map-header">
            <Box display="flex" sx={{justifyContent: 'space-between'}} >
                <Typography variant="h5" color="white" sx={{marginTop :3}}>
                    {name}
                </Typography>
                <UserCard key={mapInfo.id} userName={userName} email={email} />
            </Box>
            <Typography color="white" sx={{marginTop :1}}>
                  {description}
            </Typography>
            
            <CardActions display="flex" sx={{justifyContent: 'space-between',width:'100%'}}>
            { published ? 
            <Box>
            <IconButton aria-label="like">
                <ThumbUpTwoToneIcon sx={{fill:"#911510"}}/>
                <Typography sx={{color: 'white',fontSize:15,marginLeft:1}}>{likes} Likes</Typography>
            </IconButton>
            <IconButton aria-label="dislike">
                <ThumbDownTwoToneIcon sx={{fill:"#f93f01"}}/>
                <Typography sx={{color: 'white',fontSize:15,marginLeft:1}}>{dislikes} Dislikes </Typography>
            </IconButton>
            <IconButton aria-label="dislike">
                <DownloadForOfflineTwoToneIcon sx={{fill:"#fda005"}}/>
                <Typography sx={{color: 'white',fontSize:15,marginLeft:1}}>{downloads} Downloads </Typography>
            </IconButton> 
            <Button sx = {{backgroundImage: 'linear-gradient(to right,#F83600, #ffc406)',borderRadius:'10px',color:"white",fontWeight:"bold",marginLeft:10}}>
                VIEW
            </Button> 
            </Box> :  <Box>
            <Button disabled={editActive} sx = {{backgroundImage: 'linear-gradient(to right,#F83600, #ffc406)',borderRadius:'10px',color:"white",fontWeight:"bold",marginTop:2}}>
                EDIT
            </Button>
            <Button disabled={editActive} sx = {{backgroundImage: 'linear-gradient(to right,#F83600, #ffc406)',borderRadius:'10px',color:"white",fontWeight:"bold",marginLeft:2 ,marginTop:2}}>
                PUBLISH
            </Button>
            </Box>
            }
        </CardActions>
      </Box>
      </Box>
     

    </Box>
  );
};

export default MapCard;
