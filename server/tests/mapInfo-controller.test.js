const MapInfoController = require("../controllers/mapInfo-controller")
const MapInfo = require('../model/mapInfo-model')
const _id = "635c135b0f69e808985347fe"
const client = require('../tests/dbSetup.js')
const mongoose = require('mongoose')

const filter = { _id: _id };
const update = {
                name: "Thrid Map",
                likes: 100, 
                dislikes: 20, 
                downloads: 1000
                };

const mockMapInfo = new MapInfo({
    _id: _id,
    name: "Second Map", 
    creator: ["silonyx2"], 
    comments: ["",""],
    thumbnailURL: "none",
    likes: 10, 
    dislikes: 2, 
    downloads: 100, 
    map_id:"635888fba27acc0f5035c2f2",
    published: true
})

const mockUpdateMapInfo = new MapInfo({
    _id: _id,
    name: "Thrid Map",
    creator: ["silonyx2"], 
    comments: ["",""],
    thumbnailURL: "none",
    likes: 100, 
    dislikes: 20, 
    downloads: 1000, 
    map_id:"635888fba27acc0f5035c2f2",
    published: true,
    __v: 0 

})

beforeAll(async () => {
    await mongoose.disconnect();
    const uri = "mongodb+srv://tileslate:tileslatesbu123@tileslatecluster.zs44uh3.mongodb.net/test?retryWrites=true&w=majority";
    await mongoose.connect(uri)
  });


test("Create and get mapinfo", async () => {    
    await MapInfo.create(mockMapInfo)
    const insertedMapInfo = await MapInfo.findOne({_id: mockMapInfo._id}, function(err, docs)  {

        expect(JSON.stringify(docs)).toStrictEqual(JSON.stringify(mockMapInfo));
    })

});

test("Update and get MapInfo", async () => {    
    await MapInfo.findOneAndUpdate(filter, update)
    const updatedMapInfo = await MapInfo.findOne({_id: mockMapInfo._id}, function(err, docs)  {

        expect(JSON.stringify(docs)).toStrictEqual(JSON.stringify(mockUpdateMapInfo));
    })

});

test("Delete MapInfo", async () => {
    MapInfo.findOneAndDelete({_id: _id}, function(err, docs) {
        expect(JSON.stringify(docs)).toStrictEqual(JSON.stringify(mockUpdateMapInfo));
    })
})


afterAll( () => {
    () => setTimeout(() => process.exit(), 1000)
 })
