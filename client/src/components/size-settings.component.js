import '../App.css';
import "../App"
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../auth';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import LoginModal from "../components/login-modal.component";

import GlobalStoreContext from '../store';

const SizeSettings = ({onClose}) => {
    const {store} = useContext(GlobalStoreContext)
    const [modalOpen, setModalOpen] = useState(false);
    const [tileWidth, setTileWidth] = useState(store.currentMap.tilewidth);
    const [tileHeight, setTileHeight] = useState(store.currentMap.tileheight);
    const [mapWidth, setMapWidth] = useState(store.currentMap.width);
    const [mapHeight, setMapHeight] = useState(store.currentMap.height);
    const [incorrectSize, setIncorrectSize] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: "#524d4d",
        color: "white",
        backgroundImage :'linear-gradient(to bottom, #505051, #303031)',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

      const[empty, setEmpty] = useState(false);

      const updateField = (event, type) => {
        
        if(isNaN(event.target.value) || event.target.value.includes(" ")) {
            return;
        }

        switch(type){
            case "twidth":
                setTileWidth(event.target.value)
                break;
            case "theight":
                setTileHeight(event.target.value)
                break;
            case "mwidth":
                setMapWidth(event.target.value)
                break;
            case "mheight":
                setMapHeight(event.target.value)
                break;
        }
    }  

    const handleCloseModal = () => {
        setModalOpen(false);
    }
    const handleCloseEmpty = () => {
        setEmpty(false);
    }

    const handleUpdateSettings = () => {
        const minSize = 25;
        const maxSize = 500;

        if(mapHeight == "" || tileHeight == "" || mapWidth == "" || tileWidth == "") {
            setEmpty(true)
            return;
        }
        let correctSize = true;
        store.currentMap.tilesets.forEach(tileset => {
            if(parseInt(tileset.imagewidth) % parseInt(tileWidth) != 0 || parseInt(tileset.imageheight) % parseInt(tileHeight) != 0 
            || parseInt(tileset.imagewidth) < parseInt(tileWidth) || parseInt(tileset.imageheight) < parseInt(tileHeight)) {
                correctSize = false;
                return;
            }
        })
        if(!correctSize) {
            setErrorMessage("This tile size is incompatible with your current tilesets.")
            setIncorrectSize(true)
            return;
        }

        if(parseInt(mapWidth) > maxSize || parseInt(mapHeight) > maxSize) {
            setErrorMessage("This map size is too big. Tileslate only supports up to 500x500 maps!")
            setIncorrectSize(true)
            return;
        }

        if(parseInt(mapWidth) < minSize || parseInt(mapHeight) < minSize-5) {
            setErrorMessage("This map size is too small. Tileslate only supports above 25x20 maps!")
            setIncorrectSize(true)
            return;
        }

        let currentLayer = 0;

        //written by michael
        //dont even ask me what this is i dont wanna talk about it
        store.currentMap.layers.forEach(layer => {
            let skip = mapWidth - layer.width;
            let skipMultiplier = 1;

            let newLayerData = []
            console.log("width difference of " + (mapWidth - layer.width ))

            let tileDiff = parseInt(tileWidth) > parseInt(store.currentMap.tilesets[0].tilewidth) ? 
            parseInt(tileWidth) / parseInt(store.currentMap.tilesets[0].tilewidth) :
            parseInt(store.currentMap.tilesets[0].tilewidth) / parseInt(tileWidth)

            let negative = parseInt(tileWidth) > parseInt(store.currentMap.tilesets[0].tilewidth) ? -1 : 1;
            let k = 0;

            for(let i=0; i<parseInt(mapHeight) *parseInt(mapWidth); i++) {

                if(parseInt(mapWidth) > layer.width) {
                    if(i>layer.width-5 && i - ((layer.width * skipMultiplier + (skip*skipMultiplier))-(parseInt(mapWidth) - layer.width)) == 0) {
                        for(let j=0; j<parseInt(mapWidth) - layer.width; j++) {
                            newLayerData[i++] = 0
                        }
                        skipMultiplier++;
                    }
                }

                newLayerData[i] = negative == 1 ? layer.data[k] * (tileDiff * tileDiff) : Math.floor(layer.data[k] / (tileDiff * tileDiff))
                k = k+1;
    
            }
            store.currentMap.layers[currentLayer].data = newLayerData;
            
            store.currentMap.layers[currentLayer].height = parseInt(mapHeight);
            store.currentMap.layers[currentLayer].width = parseInt(mapWidth);
            currentLayer = currentLayer + 1;
        })

        store.currentMap.height = parseInt(mapHeight);
        store.currentMap.width = parseInt(mapWidth);

        store.currentMap.tilesets.forEach(tileset => {
            tileset.tilewidth = parseInt(tileWidth);
            tileset.tileheight = parseInt(tileHeight);
            tileset.tilecount = (parseInt(tileset.imageheight) / parseInt(tileHeight)) * (parseInt(tileset.imagewidth) / parseInt(tileWidth))
            //console.log((parseInt(tileset.imageheight) / parseInt(tileHeight)) * (parseInt(tileset.imagewidth) / parseInt(tileWidth)))
        })

        if(store.currentMap.tilesets.length == 1) {
            console.log("one tileset")
        }
        else {
            let previousTileset = store.currentMap.tilesets[0]
            let totalCount = 1;
            for(let i=1; i<store.currentMap.tilesets.length; i++) {
                let currentTileset = store.currentMap.tilesets[i]

                currentTileset.firstgid = previousTileset.tilecount + totalCount + 1;
                totalCount = totalCount + currentTileset.tilecount + 2;

                previousTileset = currentTileset;
            }
        }

        store.currentMap.tilewidth = parseInt(tileWidth);
        store.currentMap.tileheight = parseInt(tileHeight);

        console.log(store.currentMap)

        store.updateMapSize()
        
    }
    //console.log(store.currentMap)

    let modal = modalOpen ? <LoginModal message="Successfully updated!" onClose={handleCloseModal}></LoginModal> : null
    let emptyModal = empty ? <LoginModal message="A field cannot be empty!" onClose={handleCloseEmpty}></LoginModal> : null
    let incorrectSizeModal = incorrectSize ? <LoginModal message={errorMessage} onClose={() => setIncorrectSize(false)}></LoginModal> : null

    let str = "(may delete some tiles)"

    return(
        <Box>
            {modal}
            {emptyModal}
            {incorrectSizeModal}
        <Modal
            open={true}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>

            <Typography fontSize="20px">

                <Box className="qmodal-text">Tile Height</Box>
                <TextField
                required
                value={tileHeight}
                id="outlined-title-input"
                label="Tile Height"
                type="title"
                variant="filled"
                autoComplete="current-title"
                
                className = "text-field"
                onChange={(event) => updateField(event, "theight")}
                />

                <Box className="qmodal-text">Tile Width</Box>
                <TextField
                required
                value={tileWidth}
                id="outlined-title-input"
                label="Tile Width"
                type="title"
                variant="filled"
                autoComplete="current-title"
                
                className = "text-field"
                onChange={(event) => updateField(event, "twidth")}
                />  

                <Typography>Recommended tile sizes: 32x32, 64x64</Typography>
                <Typography sx={{marginTop:1.5}}>You should set your tile size when you first create your map, it can cause side-effects if you change it later!</Typography>

                <Box className="qmodal-text">Map Height</Box>
                <TextField
                required
                value = {mapHeight}
                id="outlined-title-input"
                label="Map Height"
                type="title"
                variant="filled"
                autoComplete="current-title"
                className = "text-field"
                onChange={(event) => updateField(event, "mheight")}
                />

                <Box className="qmodal-text">Map Width</Box>
                <TextField
                required
                value = {mapWidth}
                id="outlined-title-input"
                label="Map Width"
                type="title"
                variant="filled"
                autoComplete="current-title"
                className = "text-field"
                onChange={(event) => updateField(event, "mwidth")}
                />
                

            </Typography>
            <Typography sx={{marginTop:2}}>Beware of unintended consequences of reducing map size {str}</Typography>
            <Box display="flex" justifyContent="space-between" sx={{marginTop:2}}>
                <Button variant="contained" onClick={handleUpdateSettings} paddingRight={2}>Update Map</Button>
                <Button variant="contained" onClick={onClose} marginLeft={3}>Close</Button>
            </Box>
            </Box>
        </Modal>
        </Box> 
    )}

export default SizeSettings;