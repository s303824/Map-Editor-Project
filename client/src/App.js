import {BrowserRouter, BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import Banner from "./components/Banner";
import './App.css';
import { GlobalStoreContextProvider } from './store'
import { AuthContextProvider } from "./auth";
import LiterallyCanvasTest from "./components/LiterallyCanvasTest";



const App = () => {


  return (
    <BrowserRouter>
      <AuthContextProvider>
        <GlobalStoreContextProvider>  
          <Banner/>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/test" element={<LiterallyCanvasTest/>}></Route>
            </Routes>
        </GlobalStoreContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
