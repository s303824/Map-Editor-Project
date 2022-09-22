import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react'
import Container from '@mui/material/Container';

function GameCreator() {

    const [categories, setCategories] = useState(6);
    const [defaultPointVal, setDefaultPointVal] = useState(200);


    let catItems = [];
    
    for(let i=1; i<categories+1; i++){
        let innerArr = [];

        for(let j=1; j<6; j++) {

            //Individual list items
            innerArr[j] = 
            <Box key={"list-" + i + "-item-" + j}
            paddingTop="10%">
                {defaultPointVal*j + ""}
            </Box>;
        }

        catItems[i] = innerArr;
    }

    
    let catLists = [];

    for(let i=1; i<categories+1; i++) {

        //Lists
        catLists[i] = 
        <Box className="creator-list-item"
        key = {"list-" + i}>
            cat{i}
            <Box paddingTop="100%">
                {catItems[i]}
            </Box>
        </Box>
    }

    return (
        
      <Box className="Creator">
        <Box className="horizontal-list">
            {catLists}
        </Box>
      </Box>
    );
  }
  
  export default GameCreator;