const mapController = require("../controllers/map-controller.js")
const Map = require('../model/map-model')
const _id = "635888fba27acc0f5035c2f2"
const client = require('../tests/dbSetup.js')
const mongoose = require('mongoose')


const filter = { _id: _id };
const update = {
                backgroundcolor: "#650067",
                infinite: false,
                layers: [{"1":"1"}],
                tiledversion: "1.10.0",
                version: "2",
                };

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

const mockUpdateMap = new Map({
    _id: _id,
    backgroundcolor: "#650067",
    height: 4,
    infinite: false,
    layers: [{"1":"1"}],
    mapinfo:  "1",
    nextlayerid: 2,
    nextobjectid: 1,
    renderorder: "right-down",
    tiledversion: "1.10.0",
    tileheight: 32,
    tilesets: [{set:"1"}], 
    tilewidth: 32,
    version: "2",
    width: 4
})

beforeAll(async () => {
    await mongoose.disconnect();
    const uri = "mongodb+srv://tileslate:tileslatesbu123@tileslatecluster.zs44uh3.mongodb.net/test?retryWrites=true&w=majority";
    await mongoose.connect(uri)
  });


test("Create and get map", async () => {    
    await Map.create(mockMap)
    const insertedMap = await Map.findOne({_id: mockMap._id}, function(err, docs)  {

        expect(JSON.stringify(docs)).toStrictEqual(JSON.stringify(mockMap));
    })

});

test("Update and get Map", async () => {    
    await Map.findOneAndUpdate(filter, update)
    const updatedMap = await Map.findOne({_id: mockMap._id}, function(err, docs)  {

        expect(JSON.stringify(docs)).toStrictEqual(JSON.stringify(mockUpdateMap));
    })

});

test("Delete map", async () => {
    Map.findOneAndDelete({_id: _id}, function(err, docs) {
        expect(JSON.stringify(docs)).toStrictEqual(JSON.stringify(mockUpdateMap));
    })
})


afterAll( () => {
    () => setTimeout(() => process.exit(), 1000)
 })
