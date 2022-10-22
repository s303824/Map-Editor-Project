import { Button, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import "../App.css"
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'
import AuthContext from '../auth';
import PermanentDrawerLeft from '../components/sidebar.component';

function Home() {

    const { store } = useContext(GlobalStoreContext)
    const {auth} = useContext(AuthContext)


    return (
      <Box className="Home">
        <PermanentDrawerLeft></PermanentDrawerLeft>
        Welcome to Tileslate 

      </Box>
    );
  }
  
  export default Home;