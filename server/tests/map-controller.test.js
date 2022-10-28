const mapController = require("../controllers/map-controller.js")
const { MongoClient } = require('mongodb');
const Map = require('../model/map-model')
const _id = "635888fba27acc0f5035c2f2"

const mockMap = new Map({
    _id: _id,
    backgroundcolor: "#100667",
    height: 4,
    infinite: true,
    layers: [],
    mapinfo:  "1",
    nextlayerid: 2,
    nextobjectid: 1,
    renderorder: "right-down",
    tiledversion: "1.0.3",
    tileheight: 32,
    tilesets: [{set:"1"}], 
    tilewidth: 32,
    version: "1",
    width: 4
})


let client;

beforeAll(async () => {
    const mongoose = require('mongoose')
    const dotenv = require('dotenv')
    const Schema = mongoose.Schema
    dotenv.config();

    const uri = "mongodb+srv://tileslate:tileslatesbu123@tileslatecluster.zs44uh3.mongodb.net/test?retryWrites=true&w=majority";
    const db = mongoose.connect(uri)
    const connection = mongoose.connection;

    connection.once("open", function() {
    console.log("MongoDB database connection established successfully");
    });

    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, });
})

afterAll(async () => {
    await client.close();
 })


test("Create and get map", async () => {    
    await Map.create(mockMap)
    const insertedMap = await Map.findOne({_id: mockMap._id}, function(err, docs)  {

        expect(JSON.stringify(docs)).toStrictEqual(JSON.stringify(mockMap));
    })

});

test("Delete map", async () => {
    Map.findOneAndDelete({_id: _id}, function(err, docs) {
        expect(JSON.stringify(docs)).toStrictEqual(JSON.stringify(mockMap));
    })
})