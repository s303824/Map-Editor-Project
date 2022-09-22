import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import "../App.css"

function Home() {

    const { store } = useContext(GlobalStoreContext)

    const [games, setGames] = useState(store.getGames());

    /*function testGetGames() {
        setGames(store.getGames());
        console.log(games);
    }*/

    let listOfGames = [store.getGames()];
    console.log(listOfGames)
    let gamesList = [];

    for(let i =0; i<listOfGames.length; i++) {
      gamesList[i] = <Box>{listOfGames[i]['title']}</Box>
    }

    return (
      <Box className="Home">
        <Button component={Link} to="/create" variant="contained" color="primary">
            Create New Gameshow
        </Button>
        {gamesList}        
      </Box>
    );
  }
  
  export default Home;