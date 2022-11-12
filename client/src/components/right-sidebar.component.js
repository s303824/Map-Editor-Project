import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import { Typography,IconButton,Button} from '@mui/material';
import ThumbUpTwoToneIcon from '@mui/icons-material/ThumbUpTwoTone';
import ThumbDownTwoToneIcon from '@mui/icons-material/ThumbDownTwoTone';
import DownloadForOfflineTwoToneIcon from '@mui/icons-material/DownloadForOfflineTwoTone';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import UserCard from './user-card.component';
import GlobalStoreContext from '../store';
import { useContext } from 'react';
import AuthContext from '../auth';


const drawerWidth = 240;

export default function RightSideBar(mapInfo) {
  const {store} = useContext(GlobalStoreContext)
  const {auth} = useContext(AuthContext)

  if(store.currentPublishedMap.length ==0) {
    return null;
  }


  let likeColor = auth.user ? auth.user.liked_projects.includes(store.currentPublishedMap._id) ? "yellow" : "lightgrey" : "lightgrey"
  let dislikeColor = auth.user ? auth.user.disliked_projects.includes(store.currentPublishedMap._id) ? "yellow" : "lightgrey" : "lightgrey"

  const handleLike = () => {
    //if user DISLIKED map, dont allow liking
    if(auth.user.disliked_projects.includes(store.currentPublishedMap._id)) {
      //TODO: add modal for this
      return;
    }

    //if user already liked map, then dislike it
    if(auth.user.liked_projects.includes(store.currentPublishedMap._id)) {
      store.updateMapLike(store.currentPublishedMap, -1)
      auth.user.liked_projects = auth.user.liked_projects.filter(_id => _id!=store.currentPublishedMap._id)
      auth.updateUser(auth.user);
      return;
    }

    store.updateMapLike(store.currentPublishedMap, 1)
    auth.user.liked_projects.push(store.currentPublishedMap._id)
    auth.updateUser(auth.user);
  }

  const handleDislike = () => {
    //if user LIKED map, dont allow disliking
    if(auth.user.liked_projects.includes(store.currentPublishedMap._id)) {
      //TODO: add modal for this
      return;
    }

    //if user already disliked map, add 1 like and remove from dislike list
    if(auth.user.disliked_projects.includes(store.currentPublishedMap._id)) {
      store.updateMapDislike(store.currentPublishedMap, -1)
      auth.user.disliked_projects = auth.user.disliked_projects.filter(_id => _id!=store.currentPublishedMap._id)
      auth.updateUser(auth.user);
      return;
    }

    store.updateMapDislike(store.currentPublishedMap, 1)
    auth.user.disliked_projects.push(store.currentPublishedMap._id)
    auth.updateUser(auth.user);
  }


  let teamMembers = <List>
    {store.currentPublishedMap.creator.map((creator, index) => (
      <UserCard key={index} userName={creator.creator}  userImage={creator.profile_picture}/>
    ))}
  </List>;

  return (
    <Box className ='sidebar' position="fixed">
      <Drawer  
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundImage :'linear-gradient(to bottom, #505051, #303031)',
            boxShadow: '0 1px 2px 2px rgba(68,68,69,255)',
            color:"white"
          },
        }}
        variant="permanent"
        anchor="right"
      >
        <Toolbar />
        <Divider />
        <Typography sx={{fontSize:'20px',color: 'black',marginTop:1,padding:1,backgroundImage: 'linear-gradient(to top, lightgrey 0%, lightgrey 1%, #e0e0e0 26%, #efefef 48%, #d9d9d9 75%, #bcbcbc 100%)',boxShadow: '0 1px 1px 1px rgba(68,68,69,255)'}}> Created By </Typography>
        {teamMembers}
        <Divider />
        <Typography sx={{fontSize:'20px',color: 'black',marginTop:0,padding:1,backgroundImage: 'linear-gradient(to top, lightgrey 0%, lightgrey 1%, #e0e0e0 26%, #efefef 48%, #d9d9d9 75%, #bcbcbc 100%)',boxShadow: '0 1px 1px 1px rgba(68,68,69,255)'}}> Description </Typography>
        <Typography sx={{fontSize:'15px',color: 'white',marginTop:2,marginLeft:3,marginBottom:3}}> {store.currentPublishedMap.description} </Typography>
        <Divider />
        <Typography sx={{fontSize:'20px',color: 'black',marginTop:0,padding:1,backgroundImage: 'linear-gradient(to top, lightgrey 0%, lightgrey 1%, #e0e0e0 26%, #efefef 48%, #d9d9d9 75%, #bcbcbc 100%)',boxShadow: '0 1px 1px 1px rgba(68,68,69,255)'}}> Statistics </Typography>
        <Box display="flex" sx={{marginLeft:1,marginTop:2}}>
                <ThumbUpTwoToneIcon sx={{fill:likeColor}} onClick={handleLike}/>
                <Typography sx={{color: 'white',fontSize:15,marginLeft:1}}>{store.currentPublishedMap.likes} Likes</Typography>
            </Box>
        <Box display="flex" sx={{marginLeft:1,marginTop:2}}>
                <ThumbDownTwoToneIcon sx={{fill:dislikeColor}} onClick={handleDislike}/>
                <Typography sx={{color: 'white',fontSize:15,marginLeft:1}}>{store.currentPublishedMap.dislikes} Dislikes</Typography>
        </Box>
        <Box display="flex" sx={{marginLeft:1,marginTop:2}}>
                <DownloadForOfflineTwoToneIcon sx={{fill:"lightgrey"}}/>
                <Typography sx={{color: 'white',fontSize:15,marginLeft:1}}>{store.currentPublishedMap.downloads} Downloads </Typography>
        </Box>
        <Button sx = {{backgroundImage: 'linear-gradient(to right,#F83600, #ffc406)',borderRadius:'10px',color:"white",fontWeight:"bold",marginTop:5}}>
                Download
            </Button>
      </Drawer>
    </Box>
  );
}
