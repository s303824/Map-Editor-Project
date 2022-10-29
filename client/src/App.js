import {BrowserRouter, BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "../src/routes/Home";
import Banner from "./components/navbar.component";
import './App.css';
import { GlobalStoreContextProvider } from './store'
import { AuthContextProvider } from "./auth";
import Home from "../src/routes/Home";
import SignUp from "../src/components/SignUp";



const App = () => {

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <GlobalStoreContextProvider>  
          <Banner/>
            <Routes>
              <Route path="/" element={<SignUp/>}/>
              <Route path="/signup" element={<SignUp/>}/>
            </Routes>
        </GlobalStoreContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
