import {BrowserRouter, BrowserRouter as Router, Route, Routes} from "react-router-dom";
import GameCreator from "./components/GameCreator";
import Home from "./components/Home";
import Banner from "./components/Banner";
import './App.css';
import { GlobalStoreContextProvider } from './store'
import PlayGameshow from "./components/PlayGameshow";
import NewPage from "./components/NewPage";
import LoginPage from "./components/LoginPage";
import { AuthContextProvider } from "./auth";
import SignUpPage from "./components/SignUpPage";



const App = () => {


  return (
    <BrowserRouter>
      <AuthContextProvider>
        <GlobalStoreContextProvider>  
          <Banner/>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/create" element={<GameCreator/>}/>
              <Route path="/play" element={<PlayGameshow/>}></Route>
              <Route path="/newpage" element={<NewPage/>}></Route>
              <Route path="/login" element={<LoginPage/>}></Route>
              <Route path="/signup" element={<SignUpPage/>}></Route>
            </Routes>
        </GlobalStoreContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
