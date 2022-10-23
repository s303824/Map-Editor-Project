const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

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

module.exports = mongoose.model('Tilelayer', TilelayerSchema)
