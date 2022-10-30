import {BrowserRouter, BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Banner from "./components/navbar.component";
import './App.css';
import { GlobalStoreContextProvider } from './store'
import { AuthContextProvider } from "./auth";
import Home from "../src/routes/Home";
import MapEditor from "./routes/MapEditor";
import MapViewer from "./routes/MapViewer";
import MyProjects from "./routes/MyProjects";



const App = () => {

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <GlobalStoreContextProvider>  
          <Banner/>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/editor" element={<MapEditor/>}/>
              <Route path="/view" element={<MapViewer/>}/>
              <Route path="/myprojects" element={<MyProjects/>}/>
            </Routes>
        </GlobalStoreContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
