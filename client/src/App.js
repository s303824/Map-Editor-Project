import {BrowserRouter, BrowserRouter as Router, Route, Routes} from "react-router-dom";
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
import Home from "../src/routes/Home";
import SignUp from "./routes/SignUp";
import AccountSettings from "./routes/AccountSettings";
import SignIn from "./routes/SignIn";
import SignOut from "./routes/SignOut";

const App = () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <GlobalStoreContextProvider>  
          <Navigation/>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/home" element={<Home/>}/>
              <Route path="/projects" element={<MyProjects/>}/>
              <Route path="/explore" element={<Explore/>}/>
              <Route path="/tileseteditor" element={<TileSetEditor/>}/>
              <Route path="/editor" element={<MapEditor/>}/>
              <Route path="/view" element={<MapViewer/>}/>
              
            </Routes>
        </GlobalStoreContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;