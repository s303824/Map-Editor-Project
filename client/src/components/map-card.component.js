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
import { useContext, useState } from 'react';
import userImage from '../assets/userimage.png';
import ThumbUpTwoToneIcon from '@mui/icons-material/ThumbUpTwoTone';
import ThumbDownTwoToneIcon from '@mui/icons-material/ThumbDownTwoTone';
import DownloadForOfflineTwoToneIcon from '@mui/icons-material/DownloadForOfflineTwoTone';
import UserCard from './user-card.component';
import GlobalStoreContext from '../store';
import { useNavigate } from 'react-router-dom';
import LoginModal from './login-modal.component';
import CommentIcon from '@mui/icons-material/Comment';


const MapCard = ({mapInfo}) => {
    const {auth} = useContext(AuthContext)
    const {store} = useContext(GlobalStoreContext)

    const [guestWarning, setGuestWarning] = useState(false);
    const [oppositeWarning, setOppositeWarning] = useState(false);
    const [editingAtWorkWarning, setEditingAtWorkWarning] = useState(false);

    const navigate = useNavigate();

    //function for handling when a user clicks "view" on a mapcard
    const handleViewMap = () => {
        store.loadMapViewer(mapInfo.map_id, mapInfo)
    }

    const handleEditMap = () => {
        if(mapInfo.editActive == false){
            store.loadMapEditor(mapInfo.map_id, mapInfo)
            navigate("/editor/"+mapInfo._id)
        }
        else{
            setEditingAtWorkWarning(true)
        }
    }

    const handleGuestWarning = () => {
        setGuestWarning(false)
      }
      const handleOpposite = () => {
        setOppositeWarning(false);
      }
      const handleEditInProgress = () => {
        setEditingAtWorkWarning(false)
      }
    const handleLike = () => {

        //if user is NOT logged in, show modal saying they must login
        if(!auth.loggedIn) {
            setGuestWarning(true)
            return;
        }
  
      //if user previously DISLIKED the map, undo that
      if(auth.user.disliked_projects.includes(mapInfo._id)) {
        /*store.updateMapDislike(mapInfo, -1)
        auth.user.disliked_projects = auth.user.disliked_projects.filter(_id => _id!=mapInfo._id)
        auth.updateUser(auth.user);*/
        setOppositeWarning(true)
        return;
      }
  
      //if user already liked map, then unlike it
      if(auth.user.liked_projects.includes(mapInfo._id)) {
        store.updateMapLike(mapInfo, -1)
        auth.user.liked_projects = auth.user.liked_projects.filter(_id => _id!=mapInfo._id)
        auth.updateUser(auth.user);
        return;
      }
  
      store.updateMapLike(mapInfo, 1)
      auth.user.liked_projects.push(mapInfo._id)
      auth.updateUser(auth.user);

    }

    const handleDislike = () => {
        //if user is logged in, show modal saying they must login
        if(!auth.loggedIn) {
            setGuestWarning(true)
            return;
        }

    //if user previously LIKED the map, undo that
    if(auth.user.liked_projects.includes(mapInfo._id)) {
      /*store.updateMapLike(mapInfo, -1)
      auth.user.liked_projects = auth.user.liked_projects.filter(_id => _id!=mapInfo._id)
      auth.updateUser(auth.user);*/
      setOppositeWarning(true)
      return;
    }

    //if user already disliked map, add 1 like and remove from dislike list
    if(auth.user.disliked_projects.includes(mapInfo._id)) {
      store.updateMapDislike(mapInfo, -1)
      auth.user.disliked_projects = auth.user.disliked_projects.filter(_id => _id!=mapInfo._id)
      auth.updateUser(auth.user);
      return;
    }

    store.updateMapDislike(mapInfo, 1)
    auth.user.disliked_projects.push(mapInfo._id)
    auth.updateUser(auth.user);
    }

    let color = "white"
    if(mapInfo.editActive) {
        color = "black"
    }

 const {name,description,likes,dislikes,downloads,editActive,published,thumbnailURL, creator, userImage, tags, comments} = mapInfo;
 let width;
 let filteredTags = tags.filter(tag => tag != "")
 let tagsList = ""
 if (filteredTags.length > 0){
    filteredTags.forEach(tag => tagsList += "#" + tag + " ")
 }
 tagsList = tagsList.trim()

 if(tagsList == "") {
    //adds an empty space so the buttons will be lined up
    tagsList = "\u00a0"
 }

 {published!=null ? width='80%': width='60%'}

 let likeColor = auth.user ? auth.user.liked_projects.includes(mapInfo._id) ? "green" : "#FFFFFF" : "#FFFFFF"
 let dislikeColor = auth.user ? auth.user.disliked_projects.includes(mapInfo._id) ? "red" : "#FFFFFF" : "#FFFFFF"

 let loginModal = guestWarning ? <LoginModal message="You must log in to do that!" onClose={() => handleGuestWarning()}></LoginModal> : null
  let oppositeModal = oppositeWarning ? <LoginModal message="You can't like/dislike a map you have already done the opposite for!" onClose={() => handleOpposite()}></LoginModal> : null
  let inProgressModal = editingAtWorkWarning ? <LoginModal message="Map work ahead!" onClose={() => handleEditInProgress()}></LoginModal> : null

  return (
    <Box sx={{ display:'flex' ,marginTop:"2%",width:{width},backgroundImage :'linear-gradient(to bottom, #505051, #303031)',boxShadow: '0 1px 2px 2px rgba(68,68,69,255)',borderRadius:"15px"}}>
        {loginModal}
        {oppositeModal}
        {inProgressModal}
            <Box 
                m ={2}
                component="img"
                sx={{ height: 140, width: 140 }}
                 alt="map Image"
                src={thumbnailURL}
            />
    
     <Box sx={{ display: 'flex',width:'100%',flexDirection: 'column'}}>
        
         <Box className = "map-header">
            <Box display="flex" sx={{justifyContent: 'space-between'}} >
                <Typography variant="h5" color="white" sx={{marginTop :3}}>
                    {name}
                </Typography>
                <UserCard key={mapInfo.id} userName={creator[0].creator || creator} email={creator[0].email} userImage={creator[0].profile_picture}/>
            </Box>
            <Typography color="white" sx={{marginTop :1}}>
                  {tagsList}
            </Typography>
            
            <CardActions display="flex" sx={{justifyContent: 'space-between',width:'100%'}}>
            { published != "false" ? 
            <Box display="flex" sx={{justifyContent:"space-between", width:"99%"}}>
                <Box>
                    <IconButton aria-label="like" onClick={() => handleLike()}>
                        <ThumbUpTwoToneIcon sx={{fill:likeColor}}/>
                        <Typography sx={{color: 'white',fontSize:15,marginLeft:1}}>{likes} Likes</Typography>
                    </IconButton>
                    <IconButton aria-label="dislike" onClick={() => handleDislike()}>
                        <ThumbDownTwoToneIcon sx={{fill:dislikeColor}}/>
                        <Typography sx={{color: 'white',fontSize:15,marginLeft:1}}>{dislikes} Dislikes </Typography>
                    </IconButton>
                    <IconButton aria-label="dislike">
                        <DownloadForOfflineTwoToneIcon sx={{fill:"#FFFFFF"}}/>
                        <Typography sx={{color: 'white',fontSize:15,marginLeft:1}}>{downloads} Downloads </Typography>
                    </IconButton> 
                    <IconButton aria-label="dislike">
                        <CommentIcon sx={{fill:"#FFFFFF"}}/>
                        <Typography sx={{color: 'white',fontSize:15,marginLeft:1}}>{comments.length} Comments </Typography>
                    </IconButton> 
                </Box>

                <Button sx = {{backgroundImage: 'linear-gradient(to right,#F83600, #ffc406)',borderRadius:'10px',color:"white",fontWeight:"bold",marginLeft:0}} onClick={handleViewMap}>
                    VIEW
                </Button> 
            </Box> :  
            <Box display="flex" sx={{flexDirection:"row-reverse", width:"99%"}}>
                <Button sx = {{backgroundImage: 'linear-gradient(to right,#F83600, #ffc406)',borderRadius:'10px',color:"white",fontWeight:"bold",marginTop:1, color:color}} onClick={handleEditMap}>
                    EDIT
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

