import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import "../App.css"

function Home() {

    const { store } = useContext(GlobalStoreContext)

    const [games, setGames] = useState(store.getGames());

    function testGetGames() {
        setGames(store.getGameByKey(1));
        console.log(games);
    }

    return (
      <Box className="Home">
        <Button component={Link} to="/create" variant="contained" color="primary">
            Create New Gameshow
        </Button>

        <Button variant="contained" color="primary" onClick={testGetGames}>
            log
        </Button>
      </Box>
    );
  }
  
  export default Home;