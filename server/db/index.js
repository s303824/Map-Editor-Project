const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config();

const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://silonyx:tornado123@cluster0.qhqnp4y.mongodb.net/test?retryWrites=true&w=majority";
const db = mongoose.connect(uri)  


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion });


module.exports = client

