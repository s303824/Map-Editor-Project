const MapInfo = require('../model/mapInfo-model')
const User = require('../model/user-model')
const postmark = require("postmark");

registerMapInfo = async (req, res) => {
    try {
        const { _id, name,
            creator,
            thumbnailURL,
            comments,
            likes, 
            dislikes, 
            downloads,
            description, 
            map_id, 
            published, 
            editActive, 
            tags } = req.body;
        if (!(_id, name &&
            creator &&
            thumbnailURL &&
            comments &&
            likes &&
            dislikes && 
            downloads &&
            description && 
            map_id &&
            published && 
            editActive &&
            tags)) {
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }
        const existingMapInfo = await MapInfo.findOne({ _id: _id });
        if (existingMapInfo) {
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: "A mapInfo with the same _id already exists."
                })
        }

        const newMapInfo = new MapInfo({
            _id:_id,
            name, 
            creator: creator, 
            thumbnailURL,
            comments,
            likes, 
            dislikes, 
            downloads,
            description, 
            map_id, 
            published, 
            editActive, 
            tags
        });
        if(thumbnailURL == "") {
            newMapInfo.thumbnailURL = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYYS6BCkllOoE3CBQP8Uh1GRp13pFm4qImPg&usqp=CAU"
        }

        if(_id) {
            newMapInfo._id = _id
        }

        const loggedInUser = await User.findOne({username: creator[0] });

        if(!loggedInUser) {
            return res.status(400).json({
                status:"fail",
                message:"The creator of this map does not exist"
            })
        }

        loggedInUser.myprojects.push(newMapInfo._id)
        loggedInUser.save();
        
        await MapInfo.create(newMapInfo);
        return res.status(200).json({
            success: true,
            mapInfo: newMapInfo
        })

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

deleteMapInfo = async (req, res) => {
    try{
        const {  _id } = req.body;
        if(!_id){
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }
        MapInfo.findOneAndDelete({_id: _id}, function (err, docs) {
            if (err){
                console.log(err);
                return err;
                
            }
            else{

                for(var i=0; i<docs.creator.length; i++) {
                    User.findOne({username:  docs.creator[i]}, function(err, loggedInUser) { 
                        loggedInUser.myprojects = loggedInUser.myprojects.filter(function(e) {return e != docs._id})
                        loggedInUser.save();
                    });
                }

                return res
                .status(200)
                .json({ Message: "success!", mapInfo:docs });
                
            }
        })
    } catch (err){
        console.error(err);
        res.status(500).send();
    }
}

updateMapInfo = async (req, res) => {
    const { _id, name,
        creator,
        thumbnailURL,
        comments,
        likes, 
        dislikes, 
        downloads,
        description, 
        published, 
        editActive, 
        tags } = req.body;
    const selectedMapInfo = await MapInfo.findOne({ _id: _id });

    if(!selectedMapInfo) {
        return res
                .status(404)
                .json({ errorMessage: "The mapinfo with _id:" + _id + " does not exist" });
    }

    console.log("updating: " + name)

    selectedMapInfo.name = name;
    selectedMapInfo.creator = creator;
    selectedMapInfo.thumbnailURL = thumbnailURL;
    selectedMapInfo.comments = comments;

    selectedMapInfo.likes = likes;
    selectedMapInfo.dislikes = dislikes;
    selectedMapInfo.downloads = downloads;
    selectedMapInfo.published = published;
    selectedMapInfo.description = description;
    selectedMapInfo.tags = tags;

    MapInfo.findOneAndUpdate({_id: _id}, {
        name : name,
        creator : creator,
        thumbnailURL : thumbnailURL,
        comments : comments,
        likes : likes,
        dislikes : dislikes,
        downloads : downloads,
        published : published,
        description : description,
        published : published, 
        editActive : editActive, 
        tags : tags
    }, function (err, docs) {
        if (err){
            console.log(err)
            return res.status(500).send();
        }
        else{
            return res
                .status(200)
                .json({ 
                    Message: "Map info Updated.",
                    mapInfo: selectedMapInfo 
                
                });
        }
    });
}

getMapInfoByListOfIds = async (req, res) => {
    if(!req.query.idList) {
        return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
    }
    MapInfo.find({_id: req.query.idList}, function (err, docs) {
        if(err) {

        }
        else {
            if(docs == null) {
                return res
                .status(400)
                .json({
                    message: "no maps found!",
                    mapInfo: null
                })
            }
            else {
                return res
                .status(200)
                .json({ 
                    Message: "success!",
                    mapInfos: docs 
                });
            }
        }
    })
}

getMapInfo = async (req, res) => {
    try{
        console.log(req.query._id)
        if(!req.query._id){
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }
        MapInfo.findOne({_id: req.query._id}, function (err, docs) {
            if (err){
                console.log(err)
                
            }
            else{
                if (docs == null){
                    console.log("no mapInfo")
                    return res
                    .status(404)
                    .json({ 
                        Message: "Map Information - not found!",
                        err
                    });

                }
                console.log("found mapInfo")
                return res
                .status(200)
                .json({ 
                    Message: "success!",
                    mapInfo: docs 
                });
            }
        })
    } catch (err){
        console.error(err);
        res.status(500).send();
    }
}

getAllMapInfoByUser = async (req, res) => {
    try{
        const {  username } = req.query.username;
        if(!req.query){
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }  

        //find user so we can find their maps
        User.findOne({username: req.query.username}, function (err, user) {


            let query = MapInfo.find();
            query.where("creator.creator", user.username)

            const result = query.exec(function(err, docs) {
                if (err){
                    console.log(err)
                }
                else{
                    return res
                    .status(200)
                    .json({ 
                        Message: "success!",
                        mapInfos: docs 
                    });
                }

                
            });

        });

    } catch (err){
        console.error(err);
        res.status(500).send();
    }
}


getAllPublishedMapInfo = async (req, res) => {
    try{
        MapInfo.find(({published}), function (err, docs) {
            if (err){
                console.log(err)
            }
            else{
                return res
                .status(200)
                .json({ 
                    Message: "success!",
                    mapInfos: docs 
                });
            }
        });
    } catch (err){
        console.error(err);
        res.status(500).send();
    }
}

getAllMapInfoSortedByLikes = async (req, res) => {
    try{
        let skip = (10)*(req.query.page-1)
        console.log(skip)
        MapInfo.find(({published: {$ne: "false"}})).skip(skip).sort({likes: -1}).limit(10).exec(function (err, docs) {
            if (err){
                console.log(err)
            }
            else{
                return res
                .status(200)
                .json({ 
                    Message: "success!",
                    mapInfos: docs 
                });
            }
        });
    } catch (err){
        console.error(err);
        res.status(500).send();
    }
}


addCreator = async (req, res) => {
    const { username, _id } = req.body;

    const selectedMapInfo = await MapInfo.findOne({ _id: _id });    // get the selected map info
    if(!selectedMapInfo) {
        return res
                .status(404)
                .json({ errorMessage: "The mapinfo with _id:" + _id + " does not exist" });
    }

    // for each new creator's username, find User and push to selectedMapInfo.creator
    const creator_exists = await User.findOne({username: username})
    if (!creator_exists){
        return res
                .status(404)
                 .json({ errorMessage: `The user ${username} doesn't exist` });
     }
    else{
        const newPerson = {creator:creator_exists.username, email:creator_exists.email, profile_picture:creator_exists.profile_picture}
        
        const client = new postmark.ServerClient("e6e0a7f9-eaed-43f2-986c-a4a8267fef50");
        client.sendEmail({
            "From": "sean.yang@stonybrook.edu",
            "To": newPerson.email,
            "Subject": "Tileslate project shared with you",
            "HtmlBody": "You have been added to the project entitled '"  + selectedMapInfo.name + "'",
            "MessageStream": "outbound"
        });

         if(!selectedMapInfo.creator.includes(newPerson)){
            selectedMapInfo.creator.push(newPerson)    
            creator_exists.myprojects.push(selectedMapInfo)
            creator_exists.save()
        }
    };

    MapInfo.findOneAndUpdate({_id: _id}, {      // update database with new creators
        name : selectedMapInfo.name,
        creator : selectedMapInfo.creator,          
        thumbnailURL : selectedMapInfo.thumbnailURL,
        comments : selectedMapInfo.comments,
        likes : selectedMapInfo.likes,
        dislikes : selectedMapInfo.dislikes,
        downloads : selectedMapInfo.downloads,
        published : selectedMapInfo.published,
        description : selectedMapInfo.description,
        published : selectedMapInfo.published, 
        editActive : selectedMapInfo.editActive, 
        tags : selectedMapInfo.tags
    }, function (err, docs) {
        if (err){
            console.log(err)
            return res.status(400).send();
        }
        else{
            return res
                .status(200)
                .json({ 
                    Message: "Selected Creators Added.",
                    mapInfo: selectedMapInfo 
                
                });
        }
    });
}
removeCreator = async (req, res) => {
    const { username, _id} = req.body;
    console.log(req.body)
    const selectedMapInfo = await MapInfo.findOne({ _id: _id });    // get the selected map info
    
    if(!selectedMapInfo) {
        return res
                .status(404)
                .json({ errorMessage: "The mapinfo with _id:" + _id + " does not exist" });
    }

    // for each creator marked for removal, check if user exists
    const creator_exists = await User.findOne({username: username})
    if (!creator_exists){
        return res
                .status(404)
                .json({ errorMessage: "The user you entered doesn't exist" });
    }
    
    
    // filter out removedCreators out of creator
    selectedMapInfo.creator = selectedMapInfo.creator.filter(creator => username != creator.creator);
    creator_exists.myprojects.filter(mapInfo => mapInfo._id != selectedMapInfo._id)
    creator_exists.save()
    // update database
    MapInfo.findOneAndUpdate({_id: _id}, {
        name : selectedMapInfo.name,
        creator : selectedMapInfo.creator,
        thumbnailURL : selectedMapInfo.thumbnailURL,
        comments : selectedMapInfo.comments,
        likes : selectedMapInfo.likes,
        dislikes : selectedMapInfo.dislikes,
        downloads : selectedMapInfo.downloads,
        published : selectedMapInfo.published,
        description : selectedMapInfo.description,
        published : selectedMapInfo.published, 
        editActive : selectedMapInfo.editActive, 
        tags : selectedMapInfo.tags
    }, function (err, docs) {
        if (err){
            console.log(err)
            return res.status(400).send();
        }
        else{
            return res
                .status(200)
                .json({ 
                    Message: "Selected Creators Removed.",
                    mapInfo: selectedMapInfo 
                
                });
        }
    });
}

search = async(req, res) => {
    const {type, value, skip, sortBy} = req.query.payload
    console.log(sortBy)

    let query = MapInfo.find().sort({[sortBy]: -1}).limit(10);

    if(skip!=0) {
        query = MapInfo.find().skip(skip).sort({likes: -1}).limit(10);
    }

    if(type == "name") {
        query.where(type, value)
        query.where("published").ne("false")
    }

    if(type == "username") {
        query.where("creator.creator", value)
        query.where("published").ne("false")
    }

    if(type == "tags") {
        query.where("tags", value)
        query.where("published").ne("false")
    }

    const result = await query.exec(function(err, docs) {

        if(err) {
            return res.status(400).json({
                message:"something bad happened"
            })
        }

        if(docs.length == 0) {
            return res.status(200).json({
                message:"No Maps found!",
                mapInfos: []
            })
        }

        else {
            return res.status(200).json({
                message:"Maps found!",
                mapInfos: docs
            })
        }
    });
    
}



module.exports = {
    registerMapInfo,
    deleteMapInfo,
    updateMapInfo,
    getMapInfo,
    getAllMapInfoByUser,
    getAllPublishedMapInfo,
    addCreator,
    removeCreator,
    getMapInfoByListOfIds,
    getAllMapInfoSortedByLikes,
    search
}
