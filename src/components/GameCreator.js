import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import TextField from '@mui/material/TextField';

function GameCreator() {
    const { store } = useContext(GlobalStoreContext)

    const [categories, setCategories] = useState(6); //TODO: add more than 6 categories
    const [defaultPointVal, setDefaultPointVal] = useState(200);
    const [editorDisabled, setEditorDisabled] = useState(true);
    const [text, setText] = useState("");
    const [listItem, setListItem] = useState([[], [], [], [], [], [], []]);
    const [currentItem, setCurrentItem] = useState([0,0]);
    const [categoryNames, setCategoryNames] = useState(["", "cat1", "cat2", "cat3", "cat4", "cat5", "cat6"]);

    const [catEditorDisabled, setCatEditorDisabled] = useState(true);
    const [category, setCategory] = useState(0);
    const [catText, setCatText] = useState("");

    function handleClick(list, item) {
        if(editorDisabled && catEditorDisabled) {
            setCurrentItem([list, item]);
            setText(listItem[list][item]['question']);
        }
        else {
            alert("please save before doing something else");
            return;
        }
        setEditorDisabled(!editorDisabled);
    }

    function handleChange(event) {
        setText(event.target.value);
    }
    
    function handleSaveQuestion() {
        let newListItem = JSON.parse(JSON.stringify(listItem));
        newListItem[currentItem[0]][currentItem[1]] = {score:currentItem[0]*200, question:text};
        setListItem(newListItem);
        setEditorDisabled(!editorDisabled);
    }

    function handleCatClick(cat) {
        if(catEditorDisabled && editorDisabled) {
            setCategory(cat);
            setText(categoryNames[cat])
        }
        else {
            alert("please save before doing something else");
            return;
        }

        setCatEditorDisabled(!catEditorDisabled);
    }

    function handleSaveCat() {
        let newCatNames = categoryNames;
        newCatNames[category] = text;
        setCategoryNames(newCatNames);
        setCatEditorDisabled(!catEditorDisabled);
    }

    //saves game to local storage
    function handleSaveGame() {
        let newListItem = listItem;
        newListItem[0] = categoryNames;
        store.saveGame(newListItem);
    }

    useEffect(() => {
        for(let i=1; i<categories+1; i++){  
            for(let j=1; j<6; j++) {
                listItem[i][j] = {score:defaultPointVal*j, question:""};
            }
        }
    }, []);


    let catItems = [];
    
    for(let i=1; i<categories+1; i++){
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

    for(let i=1; i<categories+1; i++) {

        //Lists
        catLists[i] = 
        <Box key = {"list-" + i} className="creator-list-item">
        <Box
        onClick={(() => handleCatClick(i))}>{categoryNames[i]}</Box>

            <Box paddingTop="20px">
                {catItems[i]}
            </Box>
        </Box>
    }

    let questionEditor = editorDisabled ? "" : 
    <Box>
        <TextField id="outlined-basic" label="Question" variant="outlined" value={text} onChange={handleChange}></TextField>
        <Button onClick={handleSaveQuestion}>Save Question</Button>
    </Box>

    let catEditor = catEditorDisabled ? "" : 
    <Box>
        <TextField id="outlined-basic" label="Category" variant="outlined" value={text} onChange={handleChange}></TextField>
        <Button onClick={handleSaveCat}>Save Category</Button>
    </Box>

    const [games, setGames] = useState(store.getGames());

    function testGetGames() {
        setGames(store.getGameByKey(1));
        console.log(games);
    }

    return (
      <Box className="Creator">
        <Box paddingBottom="1%">if you leave this page before you finish editing, everything will reset</Box>
        <Box paddingBottom="1%">click on number/catergory to edit question/category</Box>
        <Box className="horizontal-list" paddingLeft="15%">
            {catLists}
        </Box>

        <Box paddingTop="5%">
            {questionEditor}
        </Box>

        <Box paddingTop="5%">
            {catEditor}
        </Box>

        <Box paddingTop="10%">
            <Button onClick={handleSaveGame}>Save Game</Button>
        </Box>
        <Button variant="contained" color="primary" onClick={testGetGames}>
            log
        </Button>
      </Box>
    );
  }
  
  export default GameCreator;