const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const reportSchema = new Schema({
    report: String,
    mapInfo_id: String,
})

module.exports = mongoose.model('Report', reportSchema)