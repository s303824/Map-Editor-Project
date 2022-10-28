
const userController = require("../controllers/user-controller.js")
const { MongoClient } = require('mongodb');

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

    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
})

afterAll(async () => {
    await client.close();
 })

test("testing 2+2=4", () => {
    expect(2+2).toBe(4)
})


/*test("Register and Get user", () => {
    const mockUser = {
        _id: "63580bd6645a413020aa88e1",
        liked_projects: [],
        myprojects: [],
        publishedMaps: [],
        username: "silonyx2",
        email: "silonyx11@gmail.com",
        password: "tornado1",
        first_name:"mik",
        last_name:"guar",
        profile_picture:" "
    }




});*/