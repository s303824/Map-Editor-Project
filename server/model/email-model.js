const mongoose = require('mongoose')
const Schema = mongoose.Schema

const emailSchema = new Schema({
    email: String,
    passcode: String,
    expire_at: {type: Date, default: Date.now, expires: 600} 
})

module.exports = mongoose.model('Email', emailSchema)