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
import { useContext, useState } from 'react';
import AuthContext from '../auth';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import UnpublishMap from './unpublish.component';
import ReportModal from './report-modal.component';
import LoginModal from './login-modal.component';


const drawerWidth = 240;

export default function RightSideBar(mapInfo) {
  const {store} = useContext(GlobalStoreContext)
  const {auth} = useContext(AuthContext)
  const anchorRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const [settings, setSettings] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [guestWarning, setGuestWarning] = useState(false);
  const [popup, setPopup] = useState(false)
  const [oppositeWarning, setOppositeWarning] = useState(false);
  
  const handleOpenReport = () => {
    setReportOpen(true)
  }

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
};
  const prevOpen = React.useRef(open);
    React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
        anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);

  if(store.currentMapInfo.length ==0) {
    return null;
  }

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
    }
    setOpen(false);
};

const handleOpenSettings = () => {
    setSettings(true)
    setOpen(false)
}

const handleGuestWarning = () => {
  setGuestWarning(false)
}
const handleOpposite = () => {
  setOppositeWarning(false);
}

function handleListKeyDown(event) {
    if (event.key === 'Tab') {
        event.preventDefault();
        setOpen(false);
    } else if (event.key === 'Escape') {
        setOpen(false);
    }
}

  //HERE FOR MAKING THE UNPUBLISH MODAL
  let unpublishModal = settings ? <UnpublishMap onClose={() => setSettings(false)}></UnpublishMap> : null
  let reportModal = reportOpen ? <ReportModal onClose={() => {setReportOpen(false)}}></ReportModal> : null

  let loginModal = guestWarning ? <LoginModal message="You must log in to do that!" onClose={() => handleGuestWarning()}></LoginModal> : null
  let oppositeModal = oppositeWarning ? <LoginModal message="You can't like/dislike a map you have already done the opposite for!" onClose={() => handleOpposite()}></LoginModal> : null

  let likeColor = auth.user ? auth.user.liked_projects.includes(store.currentMapInfo._id) ? "green" : "lightgrey" : "lightgrey"
  let dislikeColor = auth.user ? auth.user.disliked_projects.includes(store.currentMapInfo._id) ? "red" : "lightgrey" : "lightgrey"

  const handleLike = () => {
    //if user is NOT logged in, show modal saying they must login
    if(!auth.loggedIn) {
      setGuestWarning(true)
      return;
    }

    //if user previously DISLIKED the map, undo that
    if(auth.user.disliked_projects.includes(store.currentMapInfo._id)) {
      /*store.updateMapDislike(store.currentMapInfo, -1)
      auth.user.disliked_projects = auth.user.disliked_projects.filter(_id => _id!=store.currentMapInfo._id)
      auth.updateUser(auth.user);*/
      setOppositeWarning(true)
      return;
    }

    //if user already liked map, then unlike it
    if(auth.user.liked_projects.includes(store.currentMapInfo._id)) {
      store.updateMapLike(store.currentMapInfo, -1)
      auth.user.liked_projects = auth.user.liked_projects.filter(_id => _id!=store.currentMapInfo._id)
      auth.updateUser(auth.user);
      return;
    }

    store.updateMapLike(store.currentMapInfo, 1)
    auth.user.liked_projects.push(store.currentMapInfo._id)
    auth.updateUser(auth.user);
  }

  const handleDislike = () => {
  //if user is logged in, show modal saying they must login
  if(!auth.loggedIn) {
    setGuestWarning(true)
    return;
  }

    //if user previously LIKED the map, undo that
    if(auth.user.liked_projects.includes(store.currentMapInfo._id)) {
      /*store.updateMapLike(store.currentMapInfo, -1)
      auth.user.liked_projects = auth.user.liked_projects.filter(_id => _id!=store.currentMapInfo._id)
      auth.updateUser(auth.user);*/
      setOppositeWarning(true)
      return;
    }

    //if user already disliked map, add 1 like and remove from dislike list
    if(auth.user.disliked_projects.includes(store.currentMapInfo._id)) {
      store.updateMapDislike(store.currentMapInfo, -1)
      auth.user.disliked_projects = auth.user.disliked_projects.filter(_id => _id!=store.currentMapInfo._id)
      auth.updateUser(auth.user);
      return;
    }

    store.updateMapDislike(store.currentMapInfo, 1)
    auth.user.disliked_projects.push(store.currentMapInfo._id)
    auth.updateUser(auth.user);
  }

  const handleDownload = () => {}

  let teamMembers = <List>
    {store.currentMapInfo.creator.map((creator, index) => (
      <UserCard key={index} userName={creator.creator}  userImage={creator.profile_picture}/>
    ))}
  </List>;

  let unpublishOption =<MenuItem onClick={handleOpenSettings}>Unpublish</MenuItem>    

  if(auth.user) {
    let isMember = false;
    for(let i=0; i<store.currentMapInfo.creator.length; i++){
      if(auth.user.username == store.currentMapInfo.creator[i].creator) {
        isMember = true;
        break;
      }
    }
      if(!isMember)
      unpublishOption = null;
  }else{
    unpublishOption = null;
  }

  const exportAsJSONPopup = () => {
    setPopup(true)
}

const exportAsJSON = async () => {
  setPopup(false)
  let mapData = store.currentMap  
  let i = 0;
  store.currentMap.tilesets.forEach(async tileset => {
    let link = (' ' + tileset.image).slice(1);
    if(link.substring(0,5) != "https") {
      link = ("https" +link.substring(5))
    }
    tileset.image = "/" + store.currentMapInfo.name + "-tileset-" + i;
    tileset.source = null;
    tileset.margin = 0;
    tileset.imageheight = parseInt(tileset.imageheight)
    tileset.imagewidth = parseInt(tileset.imagewidth)
    mapData.tilesets[i] = tileset

    const link1 = document.createElement("a");
    const fileName1 = store.currentMapInfo.name + "-tileset-" + i;
    const blob1 = await fetch(link).
    then(res => res.blob());
    const href1 = URL.createObjectURL(blob1);

    link1.href = href1;
    link1.download = fileName1 + ".jpg";
    document.body.appendChild(link1);
    link1.click();

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link1);
    URL.revokeObjectURL(href1); 
    i=i++;
    tileset.image = link;
  })

  // create file in browser
  const fileName = store.currentMapInfo.name;
  const json = JSON.stringify(mapData, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const href = URL.createObjectURL(blob);

  // create "a" HTLM element with href to file
  const link = document.createElement("a");
  link.href = href;
  link.download = fileName + ".json";
  document.body.appendChild(link);
  link.click();

  // clean up "a" element & remove ObjectURL
  document.body.removeChild(link);
  URL.revokeObjectURL(href); 

  store.downloadMap(store.currentMapInfo._id)
}
  
  let creatorSettings = <Box marginLeft={22.5}>
        <IconButton aria-label="settings"
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? 'composition-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <SettingsTwoToneIcon sx={{fill:"#C0C0C0" ,fontSize:40}}/> 
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
            <Grow
                {...TransitionProps}
                style={{
                    transformOrigin:
                    placement === 'bottom-start' ? 'left top' : 'left bottom',
                }}
                >
                <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                        <MenuList
                            autoFocusItem={open}
                            id="composition-menu"
                            aria-labelledby="composition-button"
                            onKeyDown={handleListKeyDown}
                        >
                            {unpublishOption}
                            <MenuItem onClick={handleOpenReport}>Report</MenuItem>    
                        </MenuList>
                    </ClickAwayListener>
                </Paper>
            </Grow>
        )}
      </Popper>
</Box>

let filteredTags = store.currentMapInfo.tags.filter(tag => tag != "")
let tagsList = ""
if (filteredTags.length > 0){
   filteredTags.forEach(tag => tagsList += "#" + tag + " ")
}
tagsList = tagsList.trim()

let popupMessage = 
<Box sx={{display:"flex", flexDirection:"column", gap:2}}>
    <Typography sx={{fontSize:20}}>Here's how to export your map into a program like Tiled! </Typography>
    <Typography sx={{fontSize:20}}>When you click the download button below, you will be downloading the JSON map file, as well as your tileset images in PNG format.</Typography>
    <Typography sx={{fontSize:20}}>When you import your map into Tiled, it will ask you to select the images for your tilesets at the top. It's as simple as that!</Typography>
</Box>

    let popupModal = popup ? <LoginModal message = {popupMessage} onClose = {() => exportAsJSON()} closeButtonText = "Download" onClose2={() => setPopup(false)}></LoginModal> : null

  return (
    <Box className ='sidebar' position="fixed">
      {unpublishModal}
      {reportModal}
      {loginModal}
      {oppositeModal}
      {popupModal}
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
        <Typography sx={{fontSize:'15px',color: 'white',marginTop:2,marginLeft:3}}> {`Published on ${store.currentMapInfo.published}`} </Typography>
        <Typography sx={{fontSize:'15px',color: 'white',marginTop:2,marginLeft:3,marginBottom:3}}> {`${tagsList}`} </Typography>
        <Typography sx={{fontSize:'15px',color: 'white',marginTop:0,marginLeft:3,marginBottom:3}}> {store.currentMapInfo.description} </Typography>
        <Divider />
        <Typography sx={{fontSize:'20px',color: 'black',marginTop:0,padding:1,backgroundImage: 'linear-gradient(to top, lightgrey 0%, lightgrey 1%, #e0e0e0 26%, #efefef 48%, #d9d9d9 75%, #bcbcbc 100%)',boxShadow: '0 1px 1px 1px rgba(68,68,69,255)'}}> Map Options </Typography>
        <Box display="flex" sx={{marginLeft:1,marginTop:2}}>
                <ThumbUpTwoToneIcon sx={{fill:likeColor}} onClick={handleLike}/>
                <Typography sx={{color: 'white',fontSize:15,marginLeft:1}}>{store.currentMapInfo.likes} Likes</Typography>
            </Box>
        <Box display="flex" sx={{marginLeft:1,marginTop:2}}>
                <ThumbDownTwoToneIcon sx={{fill:dislikeColor}} onClick={handleDislike}/>
                <Typography sx={{color: 'white',fontSize:15,marginLeft:1}}>{store.currentMapInfo.dislikes} Dislikes</Typography>
        </Box>
        <Box display="flex" sx={{marginLeft:1,marginTop:2}}>
                <DownloadForOfflineTwoToneIcon sx={{fill:"lightgrey"}} onClick={() => exportAsJSONPopup()}/>
                <Typography sx={{color: 'white',fontSize:15,marginLeft:1}}>{store.currentMapInfo.downloads} Downloads </Typography>
        </Box>  
        <Box sx={{display:"flex", justifyContent:"flex-end"}}>
            <Button color="warning" variant="contained" onClick={() => exportAsJSONPopup()}>Download</Button>
          </Box>
          {creatorSettings}
      </Drawer>
    </Box>
  );
}
