import Box from '@mui/material/Box';
import "../App.css"
import {Route, Link, Routes, useLocation} from 'react-router-dom';
import MapToolBar from '../components/map-toolbar.component';
import Banner from '../components/navbar.component';

const Navigation=() =>{ 
    const location = useLocation();

    return (
      <Box>
        {location.pathname =="/mapeditor" ? <MapToolBar/> : <Banner/>}
      </Box>
    );
  }
  
  export default Navigation;