import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import "../App.css"

function Home() {
    return (
      <Box className="Home">
        <Button component={Link} to="/create" variant="contained" color="primary">
            Create New Gameshow
        </Button>
      </Box>
    );
  }
  
  export default Home;