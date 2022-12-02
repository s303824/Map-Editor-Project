import Box from '@mui/material/Box';
import "../App.css"
import {useLocation} from 'react-router-dom';
import MapToolBar from '../components/map-toolbar.component';
import Banner from '../components/navbar.component';
import TileSetToolBar from '../components/tileset-editor-toolbar.component';
import { useContext } from 'react';
import GlobalStoreContext from '../store';

const Navigation=() =>{ 
  const {store} = useContext(GlobalStoreContext)
    const location = useLocation();
    const pathname = location.pathname;
    let toolbar =
    pathname.split("/")[1] === "editor"
    ? <MapToolBar/>
    : pathname.split("/")[1] === "tileseteditor"
    ? <TileSetToolBar/>
    : <Banner/>;

    return (
      <Box>
        {toolbar}
      </Box>
    );
  }
  
  export default Navigation;