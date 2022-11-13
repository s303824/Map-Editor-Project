const MapInfoController = require("../controllers/mapInfo-controller")
const MapInfo = require('../model/mapInfo-model')
const _id = "635c135b0f69e808985347fe"
const client = require('../tests/dbSetup.js')
const mongoose = require('mongoose')

const filter = { _id: _id };
const update = {
                name: "Thrid Map",
                likes: 1, 
                dislikes: 0, 
                downloads: 1000
                };


const mockMapInfo = new MapInfo({
    _id: _id, 
    name: "Untitled Map",
    creator: [{
        creator: "user1",
        email: "user1@gmail.com",
        profile_picture: "profile_pic_URL"
    }],
    thumbnailURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYYS6BCkllOoE3CBQP8Uh1GRp13pFm4qImPg&usqp=CAU",
    comments: [],
    likes: 0, 
    dislikes: 0, 
    downloads: 0,
    description: " ", 
    map_id: "635888fba27acc0f5035c2f2", 
    published: "false", 
    editActive: false, 
    tags: []

})

const mockUpdateMapInfo = new MapInfo({
    _id: _id,
    creator: [{
        creator: "user1",
        email: "user1@gmail.com",
        profile_picture: "profile_pic_URL"
    }],
    comments: [],
    tags: [],
    name: "Thrid Map",
    thumbnailURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYYS6BCkllOoE3CBQP8Uh1GRp13pFm4qImPg&usqp=CAU",
    likes: 1,
    dislikes: 0,
    downloads: 1000,
    description: " ",
    map_id: "635888fba27acc0f5035c2f2",
    published: "false",
    editActive: false,
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
