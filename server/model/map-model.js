const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const mapsSchema = new Schema(
    {
        mapid: {type: Number, unique: true},              // Key ID
        backgroundcolor: String,    // Hex-formatted color
        height: Number,                // Number of tile rows
        infinite: Boolean,          // Whether the map has infinite dimensions
        layers: Array,              // Array of Layers
        mapinfo: Object,            // Project meta-data
        nextlayerid: Number,           // Auto-increments for each layer
        nextobjectid: Number,          // Auto-increments for each placed object
        renderorder: {type: String, default: "right-down"},   // right-down (the default), right-up, left-down or left-up
        tiledversion: String,        // The Tiled version used to save the file
        tileheight: Number,             // Map grid height
        tilesets: Array,             // Array of Tilesets
        tilewidth: Number,              // Map grid width
        version: String,             // The JSON format version
        width: Number                  // Number of tile columns
    }
)


module.exports = mongoose.model('Map', mapsSchema)
