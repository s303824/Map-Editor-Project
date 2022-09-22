import {BrowserRouter, BrowserRouter as Router, Route, Routes} from "react-router-dom";
import QuestionPage from './components/QuestionPage';
import GameCreator from "./components/GameCreator";
import Home from "./components/Home";
import Banner from "./components/Banner";
import './App.css';
import { GlobalStoreContextProvider } from './store'
import PlayGameshow from "./components/PlayGameshow";



const App = () => {


  return (
    <BrowserRouter>
      <GlobalStoreContextProvider>  
        <Banner/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/create" element={<GameCreator/>}/>
            <Route path="/play" element={<PlayGameshow/>}></Route>
          </Routes>
      </GlobalStoreContextProvider>
    </BrowserRouter>
  );
}

export default App;
