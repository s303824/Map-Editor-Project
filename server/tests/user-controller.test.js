const userController = require("../controllers/user-controller")
const auth = require("../auth/index.js")
const bcrypt = require('bcryptjs')
const User = require('../model/user-model')
const _id = "635c46f3a1b4e549ccb97f9b"
const client = require('../tests/dbSetup.js')
const mongoose = require('mongoose')
var passwordHash;
const filter = { _id: _id };
const update = {
                username: "nate11",
                email: "nate11@gmail.com",
                first_name: "Nate11", 
                last_name : "B11",
                };


const mockUser = new User({
    _id: _id, 
    username: "nate1",
    email: "nate1@gmail.com",
    password: "12345678",
    passwordVerify: "12345678",
    first_name: "Nate", 
    last_name : "B"
    
});


beforeAll(async () => {
    await mongoose.disconnect();
    const uri = "mongodb+srv://tileslate:tileslatesbu123@tileslatecluster.zs44uh3.mongodb.net/test?retryWrites=true&w=majority";
    await mongoose.connect(uri)
  });


test("Create and get User", async () => { 
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    passwordHash = await bcrypt.hash("12345678", salt); 
    mockUser.passwordHash = passwordHash
    mockUser.profile_picture = ""

    const mockUser1 = new User({
        _id: _id, 
        liked_projects: [],
        myprojects : [],
        publishedMaps: [],
        username: "nate1",
        email: "nate1@gmail.com",
        first_name: "Nate",
        last_name: "B",
        passwordHash: passwordHash,
        profile_picture: "",
        __v: 0 
    })

    await User.create(mockUser)
    const insertedUser = await User.findOne({_id: mockUser._id}, function(err, docs)  {

        expect(JSON.stringify(docs)).toEqual(JSON.stringify(mockUser1));
    })
   

});

test("Update and get User", async () => {    
    await User.findOneAndUpdate(filter, update)
    const mockUpdateUser = new User({
        _id: _id, 
        liked_projects: [],
        myprojects : [],
        publishedMaps: [],
        username: "nate11",
        email: "nate11@gmail.com",
        first_name: "Nate11",
        last_name: "B11",
        passwordHash: passwordHash,
        profile_picture: "",
        __v: 0 
    
    })
    const updatedUser = await User.findOne({_id: mockUser._id}, function(err, docs)  {

        expect(JSON.stringify(docs)).toStrictEqual(JSON.stringify(mockUpdateUser));
    })

});

test("Delete User", async () => {
    const mockUpdateUser = new User({
        _id: _id, 
        liked_projects: [],
        myprojects : [],
        publishedMaps: [],
        username: "nate11",
        email: "nate11@gmail.com",
        first_name: "Nate11",
        last_name: "B11",
        passwordHash: passwordHash,
        profile_picture: "",
        __v: 0 
    
    })
    User.findOneAndDelete({_id: _id}, function(err, docs) {
        expect(JSON.stringify(docs)).toStrictEqual(JSON.stringify(mockUpdateUser));
    })
})


afterAll( () => {
    () => setTimeout(() => process.exit(), 1000)
 })
