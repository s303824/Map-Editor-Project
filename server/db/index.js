const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Schema = mongoose.Schema
dotenv.config();

const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://tileslate:tileslatesbu123@tileslatecluster.zs44uh3.mongodb.net/test?retryWrites=true&w=majority";
const db = mongoose.connect(uri)
const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});

const mapsSchema = new Schema(
    {
        backgroundcolor: String,    // Hex-formatted color
        height: int,                // Number of tile rows
        infinite: boolean,          // Whether the map has infinite dimensions
        layers: Array,              // Array of Layers
        mapInfo: publishedMapsSchema,      // Project meta-data
        nextlayerid: int,           // Auto-increments for each layer
        nextobjectid: int,          // Auto-increments for each placed object
        renderorder: String,   // right-down (the default), right-up, left-down or left-up
        tiledversion: String,        // The Tiled version used to save the file
        tileheight: int,             // Map grid height
        tilesets: Array,             // Array of Tilesets
        tilewidth: int,              // Map grid width
        version: String,             // The JSON format version
        width: int                  // Number of tile columns
    }
)
const PublishedSchema = new Schema(
    {
        name: { type: String, required: true },     // tile of published map
        ownerName: { type: [String], required: true },      // name(s) of those who made the map
        thumbnailURL: { type: String, required: true },     // URL to the image
        comments: { type: [[String, String]], required: true },   // comments 
        likes: { type: Number, required: true },    // number of likes  
        dislikes: { type: Number, required: true }, // number of dislikes
        downloads: { type: Number, required: true } // number of downloads
    }
)
const TilesetSchema = new Schema(
    {
        backgroundcolor: {type: String, required: true},    // hex formatted color
        class: {type: String, required: false},             // (optional)
        columns: {type: Number, required: true},            // the amount of columns in the tileset
        fillmode: {type: String, required: true, default: "stretch"},   // fill mode for rendering tiles from this tileset (stretch by default)
        firstgid: {type: Number, required: true},   // the global ID of the first tile in this set, allowing mapping back to the correct tileset
        grid: {type: Grid, required: false},        // grid object with height, width, and orientation (orthogonal/isometric) (optional)
        image: {type: String, required: true},      // the image used for tiles in this set
        imageheight: {type: String, required: true},// height of source image in pixels
        imagewidth: {type: String, required: true}, // width of source image in pixels
        margin: {type: Number, required: true}, // the number of pixels between image border and first tile
        name: {type: String, required: true},           // the name of the tileset
        objectalignment: {type: String, required: true},  // alignment to use for tile objects (top, bottom, left, etc.)
        properties: {type: Array, required: true},      // array of custom properties
        source: {type: String, required: true},         // external file with the tilesets data
        tilecount: {type: Number, required: true},  // number of tiles in this tileset
        tileslateversion: {type: String, required: false}, //version of tileslate used to save this file (optional)
        tileheight: {type: Number, required: true},         // maximum height of tiles in this set
        tilerendersize: {type: String, required:true}, // size used to render tiles from this set on a layer (tile or grid size)
        tiles: {type: Array, required:false},        // array of tiles in this set (optional)
        tilewidth: {type: Number, required: false}, // maximum width of tiles in this set (optional)
        transparentcolor: {type: String, required: false}, // a hex-formatted color (optional)
        type: {type: String, required:true},    // "tileset" 
        version: {type: String, required: true}, // JSON format version
        wangsets: {type: Array, required: true} // array of wangsets
    }
)
const TilelayerSchema = new Schema(
    {
        chunks: {type: Array, required: false}, // array of chunks (tile layer data for infinite maps, optional)
        class: {type: String, required: false},         // class of layer (optional)
        compression:{type: String, required: true, default: "empty"},     // compression type (empty by default)
        data: {type: Array||String, required: true}, // array of ints (global ids) or base64-encoded data
        draworder: {type: String, required: true, default: "topdown"},  // order in which tiles should be drawn (topdown by default)
        encoding: {type: String, required: true, default: "csv"}, // csv (default) or base64
        height: {type: Number, required: true}, // Row count, same as map height for fixed size maps
        id: {type: Number, required: true},     // incremental ID that is unique for all layers
        image: {type: String, required: true},  // image used by this layer
        layers: {type: Array, required: true},       // array of layers
        locked: {type: Boolean, required: true, default: false}, // Whether the layer is locked in the editor or not (false by default)
        name: {type: String, required: true},   // name assigned to this layer
        objects: {type: Array, required: true}, // array of objects
        offsetx: {type: Number, required: true}, // horizontal offset of layer in pixels
        offsety: {type: Number, required: true}, // vertical offset of layer in pixels
        opacity: {type: Number, required: true}, // value between 0 and 1
        parallaxx: {type: Number, required: true, default: 1}, // Horizontal parallax factor (amount layer moves in relation to camera) for this layer (default 1)
        parallaxy: {type: Number, required: true, default: 1}, // Vertical parallax factor (amount layer moves in relation to camera) for this layer (default 1)
        properties: {type: Array, required: true}, // array of properties
        repeatx: {type: Boolean, required: true}, // whether or not the image drawn by this layer is repeated along the x axis
        repeaty: {type: Boolean, required: true}, // whether or not the image drawn by this layer is repeated along the y axis
        startx: {type: Number, required: true}, // x coordinate where layer starts (for infinite maps)
        starty: {type: Number, required: true}, // y coordinate where layer starts (for infinite maps)
        tintcolor: {type: String, required: false}, // hex formatted tint color multiplied with any graphics drawn by this layer (optional)    
        transparentcolor: {type:String, required: false}, //hex formatted color (optional) 
        type: {type: String, required: true}, // tilelayer, objectgroup, imagelayer, or group 
        visible: {type: Boolean, required: true}, // whether or not layer is shown in editor 
        width: {type: Number, required: true}, // column count, same of map width for fixed-size maps 
        x: 0, //horizontal layer offset in tiles. always 0 
        y: 0 //vertical layer offset in tiles. always 0 
    }
)    
const userSchema = new Schema(
    {
        first_name: {             // first name of the user
            type: String, 
            required: true,
            maxlength: 100
        },
        last_name: {              // last name of the user
            type: String,
            required: true,
            maxlength: 100
        }, 
        liked_projects: [Map], //type: array - list of maps liked by the user
    
        myprojects: [Map],  //type: array  -        list of maps created by the user 
    
        password: {               // password of the user
            type: String,
            required: true,
            minlength: 8
        },
        profile_picture: {     // image will be stored in cloudinary, and link to the image 
            type: String       // will be stored in the database
        },
    
        publishedMaps: [Published],  //type: array - list of user’s published maps
        
        user_email: {             // Email account of the user
            type: String,
            required: true,
        maxlength: 100,
        unique: true
        },
        user_name: {              // user name of the user
            type: String,
            required: true,
            maxlength: 100,
        unique: true
        }
  }
)


const Map = mongoose.model('Map', mapsSchema)
const Published = mongoose.model('Published', PublishedSchema)
const Tileset = mongoose.model('Tileset',TilesetSchema)
const Tilelayer = mongoose.model('Tilelayer',TilelayerSchema)
const User = mongoose.model('User', userSchema)


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion });


module.exports = client

