const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

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

module.exports = mongoose.model('MapInfo', PublishedSchema)
