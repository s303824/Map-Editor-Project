import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import "../App.css"
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'

function Home() {

    const { store } = useContext(GlobalStoreContext)
    const navigate = useNavigate()
    const [reset, setReset] = useState(0);

    let listOfGames = store.getGames();
    let gamesList = [];
    let titles = [];

    for(let i=0; i<listOfGames.length; i++) {
      gamesList[i] = <Box key={i} className="horizontal-list" paddingLeft="40%" paddingTop="2%">
        <Box  onClick={ () => handleGameSelect(i)}> {listOfGames[i]['title']} </Box>
        <Button onClick={() => handleDelete(listOfGames[i]['title'])}>delete</Button>
        <Box onClick={() => handleEdit(i)}>edit</Box>
      </Box>
      titles[i] = listOfGames[i]['title'];
    }

    function handleReset () {
      store.setCurrentGame("");
    }

    function handleGameSelect(i) {
      store.setCurrentGame(titles[i]);
      navigate('/play',{})
    }

    function handleDelete(title) {
      store.deleteGame(title);
      setReset(reset+1);
    }

    function handleEdit(i) {
      store.setCurrentGame(titles[i]);
      navigate('/create',{})
    }


    return (
      <Box className="Home">
        <Button component={Link} to="/create" variant="contained" color="primary">
            Create New Gameshow
        </Button>
        <Button onClick={handleReset}>
            Reset Current Game
        </Button>
        {gamesList}        

      </Box>
    );
  }
  
  export default Home;