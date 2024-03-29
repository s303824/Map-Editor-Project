const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const PublishedSchema = new Schema(
    {
        name: { type: String, required: true },     // title of published map
        creator: { type: [Object], required: true },      // User(s) that made the map
        thumbnailURL: { type: String, required: true },     // URL to the image
        comments: { type: [[String, String]], required: true },   // comments 
        likes: { type: Number, required: true },    // number of likes  
        dislikes: { type: Number, required: true }, // number of dislikes
        downloads: { type: Number, required: true }, // number of downloads
        description: {type: String, required: false}, //description of map
        map_id: { type: Schema.Types.ObjectId, ref: 'MapInfo', required: true },   // foreign key to associated Map
        published: { type: String, required: true },   // Is the project published?
        editActive: {type: Boolean, required: true}, // Can the map be edited?
        tags: {type: [String], required: false}      // Map tags
    }
)

module.exports = mongoose.model('MapInfo', PublishedSchema)
