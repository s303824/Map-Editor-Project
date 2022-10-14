const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config();

const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://tileslate:tileslatesbu123@tileslatecluster.zs44uh3.mongodb.net/test?retryWrites=true&w=majority";
const db = mongoose.connect(uri)


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion });


module.exports = client

