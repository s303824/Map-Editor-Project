import '../App.css';
import Box from '@mui/material/Box';
import AuthContext from '../auth';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

function Banner() {

    const navigate = useNavigate()
    const {auth} = useContext(AuthContext)

    return (
        <Box sx={{ flexGrow: 1 }} >
            TS
        </Box>
    );
  }

  export default Banner;
