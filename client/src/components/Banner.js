import '../App.css';
import Box from '@mui/material/Box';
import "../App.css"
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
