const mongoose = require('mongoose')
const { MongoClient } = require('mongodb');

    const dotenv = require('dotenv')
    const Schema = mongoose.Schema
    dotenv.config();

    const uri = "mongodb+srv://tileslate:tileslatesbu123@tileslatecluster.zs44uh3.mongodb.net/test?retryWrites=true&w=majority";
    const db = mongoose.connect(uri)
    const connection = mongoose.connection;

    connection.once("open", function() {
    console.log("MongoDB database connection established successfully");
    });

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, });

module.exports= client;