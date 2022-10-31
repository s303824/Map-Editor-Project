import {BrowserRouter, BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Banner from "./components/navbar.component";
import './App.css';
import { GlobalStoreContextProvider } from './store'
import { AuthContextProvider } from "./auth";
import Home from "../src/routes/Home";
import MapEditor from "./routes/MapEditor";
import MapViewer from "./routes/MapViewer";
import MyProjects from "./routes/MyProjects";
import SignUp from "./routes/SignUp";
import AccountSettings from "./routes/AccountSettings";
import SignIn from "./routes/SignIn";
import SignOut from "./routes/SignOut";



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
              <Route path="/projects" element={<MyProjects/>}/>
              <Route path="/signup" element={<SignUp/>}/>
              <Route path="/accountsettings" element={<AccountSettings/>}/>
              <Route path="/signin" element={<SignIn/>}/>
              <Route path="/signout" element={<SignOut/>}/>
            </Routes>
        </GlobalStoreContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;