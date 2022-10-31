import Box from '@mui/material/Box';
import "../App.css"
import {Route, Link, Routes, useLocation} from 'react-router-dom';
import MapToolBar from '../components/map-toolbar.component';
import Banner from '../components/navbar.component';
import TileSetToolBar from '../components/tileset-editor-toolbar.component';

const Navigation=() =>{ 
    const location = useLocation();
    const pathname = location.pathname;
    let toolbar =
    pathname === "/mapeditor"
    ? <MapToolBar/>
    : pathname === "/tileseteditor"
    ? <TileSetToolBar/>
    : <Banner/>;

    return (
      <Box>
        {toolbar}
      </Box>
    );
  }
  
  export default Navigation;