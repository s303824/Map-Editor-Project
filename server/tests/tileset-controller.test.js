const TilesetController = require("../controllers/tileset-controller")
const Tileset = require('../model/tileset-model')
const _id = "6356e51de0d0dd0888a141dc"
const client = require('../tests/dbSetup.js')
const mongoose = require('mongoose')

const filter = { _id: _id };
const update = {
                    backgroundcolor: "#dfffff",
                    columns : 2, 
                    firstgid: 11 , 
                    image: "image Url 1", 
                    imageheight: "100", 
                    imagewidth: "200",
                };

const mockTileset = new Tileset({
    _id: _id,
    backgroundcolor: "#d31313",
    columns : 1, 
    fillmode: "stretch", 
    firstgid: 1 , 
    grid: {}, 
    image: "image Url", 
    imageheight: "10", 
    imagewidth: "20", 
    margin: 2, 
    name: "tileset 2",
    objectalignment: "top", 
    properties:[
                    {
                    name:"myProperty2",
                    type:"string",
                    value:"myProperty2_value"
                    }],
    source : "tilelsate", 
    tilecount: 3, 
    tileslateversion: "1.0.1", 
    tileheight: 12, 
    tilerendersize: "10", 
    tiles : [],
    tilewidth:32, 
    transparentcolor :  "#000000", 
    type : "tileset", 
    version : "1.1", 
    wangsets: [] 
})

const mockUpdateTileset = new Tileset({
    _id: _id,
    backgroundcolor: "#dfffff",
    columns : 2, 
    fillmode: "stretch", 
    firstgid: 11 , 
    grid: {}, 
    image: "image Url 1", 
    imageheight: "100", 
    imagewidth: "200", 
    margin: 2, 
    name: "tileset 2",
    objectalignment: "top", 
    properties:[
                    {
                    name:"myProperty2",
                    type:"string",
                    value:"myProperty2_value"
                    }],
    source : "tilelsate", 
    tilecount: 3, 
    tileslateversion: "1.0.1", 
    tileheight: 12, 
    tilerendersize: "10", 
    tiles : [],
    tilewidth:32, 
    transparentcolor :  "#000000", 
    type : "tileset", 
    version : "1.1", 
    wangsets: [],
    __v: 0 
})

beforeAll(async () => {
    await mongoose.disconnect();
    const uri = "mongodb+srv://tileslate:tileslatesbu123@tileslatecluster.zs44uh3.mongodb.net/test?retryWrites=true&w=majority";
    await mongoose.connect(uri)
  });


test("Create and get tileset", async () => {    
    await Tileset.create(mockTileset)
    const insertedTileset = await Tileset.findOne({_id: mockTileset._id}, function(err, docs)  {

        expect(JSON.stringify(docs)).toStrictEqual(JSON.stringify(mockTileset));
    })

});

test("Update and get tileset", async () => {    
    await Tileset.findOneAndUpdate(filter, update)
    const updatedTileset = await Tileset.findOne({_id: mockTileset._id}, function(err, docs)  {

        expect(JSON.stringify(docs)).toStrictEqual(JSON.stringify(mockUpdateTileset));
    })

});

test("Delete Tileset", async () => {
    Tileset.findOneAndDelete({_id: _id}, function(err, docs) {
        expect(JSON.stringify(docs)).toStrictEqual(JSON.stringify(mockUpdateTileset));
    })
})


afterAll( () => {
    () => setTimeout(() => process.exit(), 1000)
 })
