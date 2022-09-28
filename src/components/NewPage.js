import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import "../App.css"
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'

function NewPage() {

    const { store } = useContext(GlobalStoreContext)
    const navigate = useNavigate()

    function handleClick() {
        window.location.href = `https://www.youtube.com/watch?v=astISOttCQ0`
    }

    return (
      <Box onClick={handleClick}>
        <Box class="container" width="100%" height="1000px" margin="0">
        <img src="https://i.pinimg.com/originals/94/ba/53/94ba53dc8a376c9727742a4fd56cf509.gif"></img>
        </Box>

        <Box display='flex' justifyContent='flex-end' position="fixed" top="50px" right="0px">
            <img src="https://media1.giphy.com/media/CJVHqlZ2v5gqI/200.gif"></img>
        </Box>

        <Box display= 'flex' justifyContent='flex' position="fixed" top="0px">
            <img src="https://c.tenor.com/T-SY8VhA-RUAAAAC/anime-angel.gif"></img>
        </Box>

        <Box display= 'flex' justifyContent='flex' position="fixed" top="400px">
            <img src="https://media3.giphy.com/media/a9JF7zgQDuZva/200w.gif?cid=82a1493btnimgahm1nnwihwglqtwoti8ui9wdp1oqtdbk031&rid=200w.gif"></img>
        </Box>

        <Box display= 'flex' justifyContent='flex' position="fixed" top="600px">
            <img src="https://img1.picmix.com/output/stamp/normal/1/9/8/9/1609891_d4706.gif"></img>
        </Box>

        <Box width="50%" height="50%" display= 'flex' justifyContent='flex-end' position="fixed" top="100px" right="400px">
            <img width="200%" src="https://cdn.discordapp.com/attachments/677989493466333204/1022743603799392266/hapy_birf.gif"></img>
        </Box>

        <Box display= 'flex' justifyContent='flex' position="fixed" top="300px" right="1px">
            <img src="https://cdn.discordapp.com/attachments/677989493466333204/1022745787505061888/unknown.png"></img>
        </Box>
        <Box display= 'flex' justifyContent='flex' position="fixed" top="100px" >
            <img src="https://acegif.com/wp-content/uploads/balloon-5.gif"></img>
        </Box>
        <Box display= 'flex' justifyContent='flex' position="fixed" top="100px" right="1px">
            <img src="https://acegif.com/wp-content/uploads/balloon-5.gif"></img>
        </Box>
        <Box display= 'flex' justifyContent='flex' position="fixed" top="700px" right="600px">
            <img src="https://cdn.discordapp.com/attachments/677989493466333204/1022746119207399464/unknown.png"></img>
        </Box>
        <Box display= 'flex' justifyContent='flex' position="fixed" top="700px" right="500px">
            <img src="https://cdn.discordapp.com/attachments/677989493466333204/1022746367820566558/unknown.png"></img>
        </Box>
        <Box display= 'flex' justifyContent='flex' position="fixed" top="700px" right="200px">
            <img src="https://cdn.discordapp.com/attachments/677989493466333204/1022746576239738910/unknown.png"></img>
        </Box>
        <Box display= 'flex' justifyContent='flex' position="fixed" top="700px" right="1200px">
            <img src="https://www.funimada.com/assets/images/cards/big/22nd-birthday-12.gif"></img>
        </Box>
        

      </Box>
    );
  }
  
  export default NewPage;