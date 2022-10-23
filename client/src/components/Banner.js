import '../App.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { Button } from '@mui/material';
import { GlobalStoreContext } from '../store'
import "../App.css"
import { useNavigate } from 'react-router-dom';
import AuthContext from '../auth';

function Banner() {

    const navigate = useNavigate()
    const {auth} = useContext(AuthContext)

    return (
        <Box sx={{ flexGrow: 1 }} >
            TS
        </Box>
    );
  }

  export default Banner;
