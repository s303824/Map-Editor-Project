import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { useEffect, useState } from 'react'
import "../App.css"
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

function PlayGameshow() {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

    const { store } = useContext(GlobalStoreContext)
    const [game, setGame] = useState(store.getGameByKey(store.getCurrentGame()));
    const [questions, setQuestions] = useState(game['questions']);
    const [defaultPointVal, setDefaultPointVal] = useState(200);
    const [qOpen, setQOpen] = useState(false);
    const [text, setText] = useState("");
    const [currentQuestion, setCurrentQuestion] = useState([])
    const [onAnswer, setOnAnswer] = useState(false);

    let catItems = [];

    function handleClick(list, item) {
        setText(questions[list][item]['question'])
        setCurrentQuestion([list, item])
        setQOpen(true);
    }

    function handleAnswer(list, item) {
        setText(questions[currentQuestion[0]][currentQuestion[1]]['answer'])
        setOnAnswer(true);
    }

    function handleClose() {
        setQOpen(false);
        setOnAnswer(false);
    }
    
    for(let i=1; i<6+1; i++){
        let innerArr = [];
        for(let j=1; j<6; j++) {

            //Individual list items
            innerArr[j] = 
            <Box key={"list-" + i + "-item-" + j}
            paddingTop="10%"
            onClick = {() => handleClick(i,j)}>
                {defaultPointVal*j + ""}
            </Box>;
        }
        catItems[i] = innerArr;
    }

    let catLists = [];

    for(let i=1; i<6+1; i++) {
        //Lists
        catLists[i] = 
        <Box key = {"list-" + i} className="creator-list-item">
        <Box>{questions[0][i]}</Box>

            <Box paddingTop="20px">
                {catItems[i]}
            </Box>
        </Box>
    }

    let button = onAnswer ? <Button onClick={handleClose}>Close</Button> : <Button onClick={handleAnswer}>Answer</Button>

    let modal = qOpen ? 
    <div>
      <Modal
        open={true}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {text}
          </Typography>
          {button}
        </Box>
      </Modal>
    </div> 
    : <Box></Box>


    return (
      <Box className="play">
        {modal}
        <Box className="horizontal-list" paddingLeft="15%">
            {catLists}
        </Box>
      </Box>
    );
  }
  
  export default PlayGameshow;