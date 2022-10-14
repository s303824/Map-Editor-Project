import '../App.css';
import Box from '@mui/material/Box';
import "../App.css"
import { useNavigate } from 'react-router-dom';

function Banner() {

    const navigate = useNavigate()

    return (
        <Box sx={{ flexGrow: 1 }} >
            <Box className="banner">``

            TS       
            </Box>
        </Box>
    );
  }

  export default Banner;
