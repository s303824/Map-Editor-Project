import '../App.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { GlobalStoreContext } from '../store'
import "../App"
import { useNavigate } from 'react-router-dom';
import AuthContext from '../auth';
import logo from '../assets/tileslate_logo.png'
import userImage from '../assets/userimage.png'

import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import Button, { ButtonProps } from '@mui/material/Button';
import Sidebar from './sidebar.component'


import Avatar from '@mui/material/Avatar';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import { CssBaseline } from '@mui/material';

function Banner() {

    const navigate = useNavigate()
    const {auth} = useContext(AuthContext)

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
        <Box sx={{ display: 'flex' ,flexGrow: 1}} >
           <CssBaseline/>
           <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
              <Toolbar sx={{boxShadow: 1 ,backgroundColor:'#18171b',justifyContent: 'space-between'}}> 
              <Box 
                component="img"
                sx={{ height: 60 }}
                alt="Logo"
                src={logo}
            />
            <Box  display="flex" flexDirection="row" > 
            <Search >
                <SearchIconWrapper style = {{borderRadius:'10%'}}>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                />
            </Search>
                <Box display="flex" flexDirection="row" sx={{ justifyContent: 'space-between' }} >
                    <Button variant="contained" size="small" sx = {{backgroundColor:"white" ,color:"black",borderRadius:'20px'}}>By Name</Button>
                    <Button variant="outlined" size="small"  sx= {{borderColor:"white",color:"white",borderRadius:'20px',marginX: 2}}>By Category</Button>
                </Box>
            </Box>
            
            <Box display="flex" flexDirection="row" >
                <Avatar alt="user image" src= {userImage} sx={{ border:2 ,borderRadius: '50%', borderColor:"#fb7603"}}></Avatar>
                <Box  sx={{ paddingX: 2, justifyContent: 'center' }}>
                    <Typography>USERNAME</Typography>
                    <Typography> user@gmail.com </Typography>
                </Box >
                <IconButton 
                    size="large"
                    aria-label="account of current user"
                > 
                <ArrowDropDownCircleIcon sx={{fill:'#ffbf06',boxShadow: 1}}/>
                </IconButton>
            </Box>
            </Toolbar>
           </AppBar>
           <Sidebar/>
        </Box>
    );
  }

  export default Banner;
