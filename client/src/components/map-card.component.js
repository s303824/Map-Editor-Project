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
import AuthContext from '../auth';
import { useContext } from 'react';
import userImage from '../assets/userimage.png';
import ThumbUpTwoToneIcon from '@mui/icons-material/ThumbUpTwoTone';
import ThumbDownTwoToneIcon from '@mui/icons-material/ThumbDownTwoTone';
import DownloadForOfflineTwoToneIcon from '@mui/icons-material/DownloadForOfflineTwoTone';
import UserCard from './user-card.component';
import GlobalStoreContext from '../store';
import { useNavigate } from 'react-router-dom';


const MapCard = ({mapInfo}) => {
    const {auth} = useContext(AuthContext)
    const {store} = useContext(GlobalStoreContext)

    const navigate = useNavigate();

    //function for handling when a user clicks "view" on a mapcard
    const handleViewMap = () => {
        store.loadMapViewer(mapInfo.map_id, mapInfo)
        navigate("/view", {})
    }

    const handleEditMap = () => {
        store.loadMapEditor(mapInfo.map_id, mapInfo)
        navigate("/editor", {})
    }

 const {name,description,likes,dislikes,downloads,editActive,published,thumbnailURL, creator, userImage} = mapInfo;
 let width;

 let tags = ""
 tags.length !== 0 && description.forEach(tag => tags += tag + " ")

 {published!="false" ? width='80%': width='60%'}

  return (
    <Box sx={{ display:'flex' ,marginTop:"2%",width:{width},backgroundImage :'linear-gradient(to bottom, #505051, #303031)',boxShadow: '0 1px 2px 2px rgba(68,68,69,255)',borderRadius:"15px"}}>
            <Box 
                m ={2}
                component="img"
                sx={{ height: 140 }}
                 alt="map Image"
                src={thumbnailURL}
            />
    
     <Box sx={{ display: 'flex',width:'100%',flexDirection: 'column'}}>
        
         <Box className = "map-header">
            <Box display="flex" sx={{justifyContent: 'space-between'}} >
                <Typography variant="h5" color="white" sx={{marginTop :3}}>
                    {name}
                </Typography>
                <UserCard key={mapInfo.id} userName={creator[0]} userImage={userImage}/>
            </Box>
            <Typography color="white" sx={{marginTop :1}}>
                  {tags}
            </Typography>
            
            <CardActions display="flex" sx={{justifyContent: 'space-between',width:'100%'}}>
            { published != "false" ? 
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
                <Button sx = {{backgroundImage: 'linear-gradient(to right,#F83600, #ffc406)',borderRadius:'10px',color:"white",fontWeight:"bold",marginLeft:15}} onClick={handleViewMap}>
                    VIEW
                </Button> 
            </Box> :  <Box>
                <Button disabled={editActive} sx = {{backgroundImage: 'linear-gradient(to right,#F83600, #ffc406)',borderRadius:'10px',color:"white",fontWeight:"bold",marginTop:2}} onClick={handleEditMap}>
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

