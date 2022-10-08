import { Button, Grid } from '@mui/material';
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




const Tileset = new Schema(
    {
        backgroundcolor: {type: String, required: true},    //hex formatted color
        class: {type: String, required: false},             // (optional)
        columns: {type: Number, required: true},            //the amount of columns in the tileset
        fillmode: {type: String, required: true},           //fill mode for rendering tiles from this tileset (stretch by default)
        firstgid: {type: Number, required: true},           //the global ID of the first tile in this set, allowing mapping back  to the correct tileset
        grid: {type: Grid, required: false},                //grid object with height, width, and orientation (orthogonal/isometric) (optional)
        image: {type: String, required: true},              //the image used for tiles in this set
        imageheight: {type: String, required: true},        //height of source image in pixels
        imagewidth: {type: String, required: true},         //width of source image in pixels
        margin: {type: Number, required: true},             //the number of pixels between image border and first tile
        name: {type: String, required: true},               //the name of the tileset
        objectalignment: {type: String, required: true},    //alignment to use for tile objects (top, bottom, left, etc.)
        properties: {type: Array, required: true},          //array of custom properties
        source: {type: String, required: true},             //external file with the tilesets data
        tilecount: {type: Number, required: true},          //number of tiles in this tileset
        tileslateversion: {type: String, required: false},  //version of tileslate used to save this file (optional)
        tileheight: {type: Number, required: true},         //maximum height of tiles in this set
        tilerendersize: {type: String, required:true},      //size used to render tiles  from this set on a layer (tile or grid size)
        tiles: {type: Array, required:false},               //array of tiles in this set (optional)
        tilewidth: {type: Number, required: false},         //maximum width of tiles in this set (optional)
        transparentcolor: {type: String, required: false},  //a hex-formatted color (optional)
        type: {type: String, required:true},                //"tileset"
        version: {type: String, required: true},            //JSON format version
        wangsets: {type: Array, required: true}             //array of wangsets
    }
)

const TileLayer = new Schema(
    {
        chunks: {type: Array, required: false},         //array of chunks (tile layer data for infinite maps, optional)
        class: {type: String, required: false},         //class of layer (optional)
        compression: {type: String, required: true},    //compression type (empty by default)
        data: {type: Array||String, required: true},    //array of ints (global ids) or base64-encoded data
        draworder: {type: String, required: true},      //order in which tiles should be drawn (topdown by default)
        encoding: {type: String, required: true},       //csv (default) or base64
        height: {type: Number, required: true},         //Row count, same as map height for fixed size maps
        id: {type: Number, required: true},             //incremental ID that is unique for all layers
        image: {type: String, required: true},          //image used by this layer
        layers: {type: Array, required: true},          //array of layers
        locked: {type: Boolean, required: true},        //Whether the layer is locked in the editor or not (false by default)
        name: {type: String, required: true},           //name assigned to this layer
        objects: {type: Array, required: true},         //array of objects
        offsetx: {type: Number, required: true},        //horizontal offset of layer in pixels
        offsety: {type: Number, required: true},        //vertical offset of layer in pixels
        opacity: {type: Number, required: true},        //value between 0 and 1
        parallaxx: {type: Number, required: true},      //Horizontal parallax factor (amount layer moves in relation to camera) for this layer (default 1)
        parallaxy: {type: Number, required: true},      //Vertical parallax factor (amount layer moves in relation to camera) for this layer (default 1)
        properties: {type: Array, required: true},      //array of properties
        repeatx: {type: Boolean, required: true},       //whether or not the image drawn by this layer is repeated along the x axis
        repeaty: {type: Boolean, required: true},       //whether or not the image drawn by this layer is repeated along the y axis
        startx: {type: Number, required: true},         //x coordinate where layer starts (for infinite maps)
        starty: {type: Number, required: true},         //y coordinate where layer starts (for infinite maps)
        tintcolor: {type: String, required: false},     //hex formatted tint color multiplied with any graphics drawn by this layer (optional)
        transparentcolor: {type:String, required: false}, //hex formatted color (optional)
        type: {type: String, required: true},           //tilelayer, objectgroup, imagelayer, or group
        visible: {type: Boolean, required: true},       //whether or not layer is shown in editor
        width: {type: Number, required: true},          //column count, same of map width for fixed-size maps
        x: {type: Number, required: true},              //horizontal layer offset in tiles. always 0
        y: {type: Number, required: true}               //vertical layer offset in tiles. always 0
    }
)