import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeMaxIcon from '@mui/icons-material/HomeMax';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import ExploreIcon from '@mui/icons-material/Explore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 280;
//This array will be used to render different ListItemIcons based on the index 
const icons = [<HomeMaxIcon sx={{fill:'white'}}/>,<CoPresentIcon sx={{fill:'white'}}/>, <FavoriteIcon sx={{fill:'white'}}/>,<ExploreIcon sx={{fill:'white'}}/>,<SettingsIcon sx={{fill:'white'}}/>, <LogoutIcon sx={{fill:'white'}}/>];

export default function SideBar() {

  const navigate = useNavigate();

  const handleClick = (text) => {
    switch(text) {
      case "Home Page":
        navigate("/", {})
        break;

      case "My Projects":
        navigate("/projects", {})
        break;

      case "Liked Maps":
          navigate("/likedmaps", {})
          break;

      case "Explore": 
        navigate("/explore", {})
        break;

      case "Settings":
        navigate("/accountSettings", {})
        break;
      
      case "Log Out":
        navigate("/logout", {})
        break;
    }
  }

  return (
    <Box className ='sidebar' position="fixed">
      <Drawer  
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: "#a51916",
            color:"white"
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {['Home Page', 'My Projects', 'Liked Maps', 'Explore', 'Settings', 'Log Out'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => handleClick(text)}>
                <ListItemIcon>
                  {icons[index]}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
    </Box>
  );
}
