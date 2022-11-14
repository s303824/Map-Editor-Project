const Map = require('../model/map-model')
const MapInfo = require('../model/mapInfo-model')
const User = require("../model/user-model")

registerMap = async (req, res) => {
    try {
        const { _id, compressionlevel, backgroundcolor, height, infinite, layers, mapinfo, nextlayerid, 
            nextobjectid, orientation, renderorder, tiledversion, tileheight, tilesets, 
            tilewidth, type, version, width } = req.body;

        if (!( compressionlevel && backgroundcolor && height && infinite!==null && layers && mapinfo
            && nextlayerid && nextobjectid && orientation && renderorder && tiledversion 
            && tileheight && tilesets && tilewidth && type && version && width)) {
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }
    
        const existingMap = await Map.findOne({ _id: _id });
        if (existingMap != null) {
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: "A map with the same ID already exists."
                })
        }

        const newMap = new Map({
            compressionlevel,
            backgroundcolor,    // Hex-formatted color
            height,                // Number of tile rows
            infinite,          // Whether the map has infinite dimensions
            layers,              // Array of Layers
            mapinfo,            // Project meta-data
            nextlayerid,           // Auto-increments for each layer
            nextobjectid,          // Auto-increments for each placed object
            orientation,
            renderorder,   // right-down (the default), right-up, left-down or left-up
            tiledversion,        // The Tiled version used to save the file
            tileheight,             // Map grid height
            tilesets,             // Array of Tilesets
            tilewidth,              // Map grid width
            type,
            version,             // The JSON format version
            width                  // Number of tile columns
        });

        //creating mapinfo
        const {ownerName, email, profile_picture} = mapinfo
        const description = " "
        const creator = [{creator:ownerName, email:email, profile_picture:profile_picture}]
        const published = "false"
        const map_id = _id ? _id : newMap._id
        const thumbnailURL = "blah"
        const name = "Untitled Map"
        const editActive = false;
        const downloads = 0;
        const likes = 0;
        const dislikes = 0;
        const comments = [];
        const tags = ""

        const newMapInfo = new MapInfo({
            name,
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
            tags
        });

        newMapInfo.thumbnailURL = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYYS6BCkllOoE3CBQP8Uh1GRp13pFm4qImPg&usqp=CAU"
        newMap.mapinfo = newMapInfo._id;

        //adding map to user projects
        const loggedInUser = await User.findOne({username: ownerName });
        loggedInUser.myprojects.push(newMapInfo._id)

        if(_id) {
            newMap._id = _id
        }


        await MapInfo.create(newMapInfo);
        await Map.create(newMap);
        await loggedInUser.save()

        return res.status(200).json({
            success: true,
            map: newMap,
            mapInfo: newMapInfo,
            user: loggedInUser,
            message: "Map successfully created"
        })
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

deleteMap = async (req, res) => {
    try{
        const {  _id } = req.body;

        if(!_id){
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
                
        }
        console.log(_id)
        await Map.findOne({_id: _id}, function (err, docs) {
            if (docs==null){
                console.log("delete: couldnt find map")
                return res.status(404).json({
                    err,
                    message: 'could not find the map!',
                })
            }
            else{

                const newMap = MapInfo.findOne({_id: docs.mapinfo}, function (err, map) {
                    console.log("delete: couldnt find mapInfo: " +docs.mapinfo) 

                    if(err) { 
                        //console.log("Could not find mapInfo related to map with _id " + _id);
                        return res.status(400).json({
                            success:false
                        })
                    }
                    //console.log("Deleted MapInfo related to map with _id " + _id)

                    for(var i=0; i<map.creator.length; i++) {
                        User.findOne({username:  map.creator[i].creator}, function(err, loggedInUser) { 
                            loggedInUser.myprojects = loggedInUser.myprojects.filter(function(e) {return e != map._id})
                            loggedInUser.save();
                        });
                    }
                    console.log(docs.mapinfo)
                    console.log(_id)

                    MapInfo.findByIdAndDelete({_id: docs.mapinfo}, function(err, test) {
                        console.log(test)
                    })
                    Map.findByIdAndDelete({_id: _id}, function(err, test) {
                        console.log(test)
                    })

                })


                return res.status(200).json({
                    message: 'Map deleted!',
                    docs
                })
            }
        })  
    } catch (err){
        console.error(err);
        res.status(500).send();
    }
}

updateMap = async (req, res) => {
    const { _id, backgroundcolor, height, infinite, layers, nextlayerid, 
        nextobjectid, renderorder, tiledversion, tileheight, tilesets, 
        tilewidth, version, width } = req.body;
    const selectedMap = await Map.findOne({ _id: _id });

    if(selectedMap === null){
        return res
            .status(404)
            .json({ errorMessage: "No map found!" });
    }

    Map.findOneAndUpdate({_id: _id}, {
        backgroundcolor : backgroundcolor,
        height : height, 
        infinite : infinite,
        layers : layers,
        nextlayerid : nextlayerid,
        nextobjectid : nextobjectid,
        renderorder : renderorder,
        tiledversion : tiledversion,
        tileheight : tileheight,
        tilesets : tilesets,
        tilewidth : tilewidth,
        version : version,
        width : width
    }, function (err, docs) {
        if (err){
            return res.status(500).json({
                err,
                message: 'could not update the map!',
            }).send();
        }
        else{
            return res.status(200).json({
                message: 'Map Updated!',
                map: docs,
            }).send()
        }
        
    });
}

getMap = async (req, res) => {
    try{
        const   _id  = req.query._id;
        if(!req.query._id){
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }
        console.log("map get:" +req.query._id )
        Map.findOne({_id: req.query._id}, function (err, docs) {
            if (err){
                console.log(err)
                return res.status(404).json({
                    message: "Map not found!"
                })
            }
            else{
                return res.status(200).json({
                    success:true,
                    map: docs 
                })
                
            }
        })
    } catch (err){ 
        console.error(err);
        res.status(500).send();
    }
}

module.exports = {
    registerMap,
    deleteMap,
    updateMap,
    getMap
}