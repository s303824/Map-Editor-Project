import { Button, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import "../App.css"
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'
import AuthContext from '../auth';
import "../literallycanvas.css"

import LC from "literallycanvas";

function Home() {

    return (
      <Box >

        Welcome to Tileslate 

      </Box>
    );
  }
  
  export default Home;