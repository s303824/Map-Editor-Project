import {BrowserRouter, BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "../src/routes/Home";
import Banner from "./components/navbar.component";
import MapEditor from "../src/routes/MapEditor";
import MapToolBar from "../src/components/map-toolbar.component";
import MyProjects from "./routes/MyProjects";
import MapViewer from "./routes/MapViewer";
import Explore from "./routes/Explore";
import Navigation from "./routes/Navigation";
import './App.css';
import { GlobalStoreContextProvider } from './store'
import { AuthContextProvider } from "./auth";
import TileSetEditor from "./routes/TilesetEditor";
 
const App = () => {

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <GlobalStoreContextProvider>  
          <Navigation/>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/home" element={<Home/>}/>
              <Route path="/mapeditor" element={<MapEditor/>}/>
              <Route path="/projects" element={<MyProjects/>}/>
              <Route path="/mapviewer" element={<MapViewer/>}/>
              <Route path="/explore" element={<Explore/>}/>
              <Route path="/tileseteditor" element={<TileSetEditor/>}/>
            </Routes>
        </GlobalStoreContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
