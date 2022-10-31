import {BrowserRouter, BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "../src/routes/Home";
import Banner from "./components/navbar.component";
import './App.css';
import { GlobalStoreContextProvider } from './store'
import { AuthContextProvider } from "./auth";
import LiterallyCanvasTest from "./components/LiterallyCanvasTest";
import MapEditor from "../src/routes/MapEditor";
import MapToolBar from "../src/components/map-toolbar.component";
import MyProjects from "./routes/MyProjects";
import MapViewer from "./routes/MapViewer";



const App = () => {

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <GlobalStoreContextProvider>  
          <Banner/>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/mapeditor" element={<MapEditor/>}/>
              <Route path="/projects" element={<MyProjects/>}/>
              <Route path="/mapviewer" element={<MapViewer/>}/>
            </Routes>
        </GlobalStoreContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
