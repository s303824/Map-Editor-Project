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
import AuthContext from '../auth';
import { useContext } from 'react';
import LoginModal from './login-modal.component';

const drawerWidth = 280;
//This array will be used to render different ListItemIcons based on the index 
export default function SideBar() {
  const [modalActive, setModalActive] = React.useState(false);
  const {auth} = useContext(AuthContext)

  let icons = [<HomeMaxIcon sx={{fill:'white'}}/>,
  auth.loggedIn ? <CoPresentIcon sx={{fill:'white'}}/> : null, 
  auth.loggedIn ? <FavoriteIcon sx={{fill:'white'}}/> : null,
 <ExploreIcon sx={{fill:'white'}}/>,
 auth.loggedIn ? <SettingsIcon sx={{fill:'white'}}/> : null,
  <LogoutIcon sx={{fill:'white'}}/>];

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
        if(!auth.loggedIn) {
          setModalActive(true)
          break;
        } 
        navigate("/accountSettings", {})
        break;
      
      case "Log Out":

        if(!auth.loggedIn) {
          setModalActive(true)
          break;
        }
        navigate("/logout", {})
        break;
    }
  }

  const handleModalClose = () => {
    setModalActive(false)
  }

  const modal = modalActive ? <LoginModal message="You must be logged in to use this feature!" onClose={handleModalClose}></LoginModal> : null;

  let sideList =  ['Home Page', 
  auth.loggedIn && 'My Projects', 
  auth.loggedIn && 'Liked Maps', 
  'Explore', 
  auth.loggedIn && 'Settings', 
  auth.loggedIn && 'Log Out']
  sideList = sideList.filter(e => e!=false)
  icons = icons.filter( e=> e!= null)
  
  return (
    <Box className ='sidebar' position="fixed">
      {modal}
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
          {sideList.map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => handleClick(text)}>
                <ListItemIcon>
                 {auth.loggedIn ? icons[index] : index !== 5 && icons[index]}
               
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
