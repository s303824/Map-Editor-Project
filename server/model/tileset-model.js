const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const TilesetSchema = new Schema(
    {
        backgroundcolor: {type: String, required: true},    // hex formatted color
        class: {type: String, required: false},             // (optional)
        columns: {type: Number, required: true},            // the amount of columns in the tileset
        fillmode: {type: String, required: true, default: "stretch"},   // fill mode for rendering tiles from this tileset (stretch by default)
        firstgid: {type: Number, required: true},   // the global ID of the first tile in this set, allowing mapping back to the correct tileset
        grid: {type: Object, required: false},        // grid object with height, width, and orientation (orthogonal/isometric) (optional)
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

module.exports = mongoose.model('Tileset', TilesetSchema)
