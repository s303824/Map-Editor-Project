import '../App.css';
import "../App"

import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../auth';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import { styled, alpha } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import logo from '../assets/tileslate_logo.png'
import userImage from '../assets/userimage.png'
import Sidebar from './sidebar.component'
import UserCard from './user-card.component';


function Banner() {

    const navigate = useNavigate();
    const {auth} = useContext(AuthContext);

    const handleLogin = () => {
      navigate("/login", {})
    }
    const handleSignUp = () => {
      navigate("/signup", {})
    }

    const handleGoHome = () => {
      navigate("/", {})
    }

    const handleSearch = () => {
      navigate("/explore", {})
    }

    const handleEnterPress = (event) => {
      if(event.key == "Enter") {
        handleSearch();
      }
    }

  let userInfo = {
    "id":1,
    "userName":"Guest",
    "email": "",
    "image": "../assets/guestImage.jpg"
}

if(auth.loggedIn) {
  userInfo = {
    "id":1,
    "userName":auth.user.username,
    "email":auth.user.email,
    "image": auth.user.profile_picture

  }
}
    
    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'auto',
        },
      }));
      
      const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }));
      
      const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
          padding: theme.spacing(1, 1, 1, 0),
          // vertical padding + font size from searchIcon
          paddingLeft: `calc(1em + ${theme.spacing(4)})`,
          transition: theme.transitions.create('width'),
          width: '100%',
          [theme.breakpoints.up('md')]: {
            width: '20ch',
          },
        },
      }));

    return (
        <Box className='top-navbar' sx={{ display: 'flex' ,flexGrow: 1}} >
           <CssBaseline/>
           <AppBar position="static" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1}}>
              <Toolbar sx={{boxShadow: 1 ,backgroundColor:'#1E1E1E',justifyContent: 'space-between'}}> 
              <Box 
                component="img"
                sx={{ height: 60 }}
                alt="Logo"
                src={logo}
                onClick={handleGoHome}
            />
            <Box  display="flex" flexDirection="row" > 
            <Search >
                <SearchIconWrapper style = {{borderRadius:'10%'}}>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    onKeyDown={handleEnterPress}
                />
            </Search>
                <Box display="flex" flexDirection="row" sx={{ justifyContent: 'space-between' }} >
                    <Button variant="contained" size="small" sx = {{backgroundColor:"white" ,color:"black",borderRadius:'20px'}} onClick={handleSearch}>By Name</Button>
                    <Button variant="outlined" size="small"  sx= {{borderColor:"white",color:"white",borderRadius:'20px',marginX: 2}} onClick={handleSearch}>By Category</Button>
                </Box>
            </Box>
            
            {auth.loggedIn && <Box display="flex" flexDirection="row" >
                <UserCard userName ={userInfo.userName} email = {userInfo.email} userImage={userInfo.image}/>
            </Box>}
            {!auth.loggedIn && <Box display="flex" flexDirection="row" sx={{ justifyContent: 'space-between' }} >
                    <Button variant="outlined" size="small"  sx= {{borderColor:"white",color:"white",borderRadius:'20px',marginX: 2}} onClick={handleLogin}>Sign In</Button>
                    <Button variant="contained" size="small" className='button-color' sx = {{borderRadius:'20px'}} onClick={handleSignUp}>Sign Up</Button>
            </Box>}
            </Toolbar>
           </AppBar>
           <Sidebar/>
        </Box>
    );
  }

  export default Banner;
