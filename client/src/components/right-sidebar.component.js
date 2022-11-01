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


const drawerWidth = 240;
//This array will be used to render different ListItemIcons based on the index 
const teamMembers = [{
    "userName":"user1",
    "email":"user1@gmail.com"
    },
    {
        "userName":"user2",
        "email":"user2@gmail.com"
    },
    {
        "userName":"user3",
        "email":"user3@gmail.com"
    }

]

export default function RightSideBar() {
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
        <List>
          {teamMembers.map((userInfo, index) => (
            <UserCard key={index} userName={userInfo.userName} email={userInfo.email} />
          ))}
        </List>
        <Divider />
        <Typography sx={{fontSize:'20px',color: 'black',marginTop:0,padding:1,backgroundImage: 'linear-gradient(to top, lightgrey 0%, lightgrey 1%, #e0e0e0 26%, #efefef 48%, #d9d9d9 75%, #bcbcbc 100%)',boxShadow: '0 1px 1px 1px rgba(68,68,69,255)'}}> Description </Typography>
        <Typography sx={{fontSize:'15px',color: 'white',marginTop:2,marginLeft:3,marginBottom:3}}> This map was created for Mckilla Gorilla. </Typography>
        <Divider />
        <Typography sx={{fontSize:'20px',color: 'black',marginTop:0,padding:1,backgroundImage: 'linear-gradient(to top, lightgrey 0%, lightgrey 1%, #e0e0e0 26%, #efefef 48%, #d9d9d9 75%, #bcbcbc 100%)',boxShadow: '0 1px 1px 1px rgba(68,68,69,255)'}}> Statistics </Typography>
        <Box display="flex" sx={{marginLeft:1,marginTop:2}}>
                <ThumbUpTwoToneIcon sx={{fill:"lightgrey"}}/>
                <Typography sx={{color: 'white',fontSize:15,marginLeft:1}}> 88 Likes</Typography>
            </Box>
        <Box display="flex" sx={{marginLeft:1,marginTop:2}}>
                <ThumbDownTwoToneIcon sx={{fill:"lightgrey"}}/>
                <Typography sx={{color: 'white',fontSize:15,marginLeft:0}}> 10 Dislikes</Typography>
        </Box>
        <Box display="flex" sx={{marginLeft:1,marginTop:2}}>
                <DownloadForOfflineTwoToneIcon sx={{fill:"lightgrey"}}/>
                <Typography sx={{color: 'white',fontSize:15,marginLeft:0}}> 100 Downloads </Typography>
        </Box>
        <Button sx = {{backgroundImage: 'linear-gradient(to right,#F83600, #ffc406)',borderRadius:'10px',color:"white",fontWeight:"bold",marginTop:5}}>
                Download
            </Button>
      </Drawer>
    </Box>
  );
}
