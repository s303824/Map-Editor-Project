import {BrowserRouter, BrowserRouter as Router, Route, Routes} from "react-router-dom";
import QuestionButton from './components/QuestionButton';
import QuestionPage from './components/QuestionPage';
import GameCreator from "./components/GameCreator";
import Home from "./components/Home";
import Banner from "./components/Banner";
import './App.css';
import DBManager from './db/DBManager';



const App = () => {


  return (
    <BrowserRouter>
      <Banner/>

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/create" element={<GameCreator/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
