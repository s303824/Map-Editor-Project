const Map = require('../model/map-model')
const MapInfo = require('../model/mapInfo-model')
const User = require("../model/user-model")

registerMap = async (req, res) => {
    try {
        const { _id, backgroundcolor, height, infinite, layers, mapinfo, nextlayerid, 
            nextobjectid, renderorder, tiledversion, tileheight, tilesets, 
            tilewidth, version, width } = req.body;
        if (!( backgroundcolor && height && infinite && layers && mapinfo 
            && nextlayerid && nextobjectid && renderorder && tiledversion 
            && tileheight && tilesets && tilewidth && version && width)) {
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
            backgroundcolor,    // Hex-formatted color
            height,                // Number of tile rows
            infinite,          // Whether the map has infinite dimensions
            layers,              // Array of Layers
            mapinfo,            // Project meta-data
            nextlayerid,           // Auto-increments for each layer
            nextobjectid,          // Auto-increments for each placed object
            renderorder,   // right-down (the default), right-up, left-down or left-up
            tiledversion,        // The Tiled version used to save the file
            tileheight,             // Map grid height
            tilesets,             // Array of Tilesets
            tilewidth,              // Map grid width
            version,             // The JSON format version
            width                  // Number of tile columns
        });

        //creating mapinfo
        const {name, ownerName, thumbnailURL, comments, likes, dislikes, downloads} = mapinfo
        const creator = [ownerName]
        const published = "not-published"
        const map_id = newMap._id

        const newMapInfo = new MapInfo({
            name,
            creator,
            thumbnailURL,
            comments,
            likes,
            dislikes,
            downloads,
            map_id,
            published
        });

        newMap.mapinfo = newMapInfo._id;

        //adding map to user projects
        const loggedInUser = await User.findOne({username: ownerName });
        loggedInUser.myprojects.push(newMapInfo._id)


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
        await Map.findOneAndDelete({_id: _id}, function (err, docs) {
            if (docs==null){
                return res.status(404).json({
                    err,
                    message: 'could not find the map!',
                })
            }
            else{
                User.findOne({username: docs.mapinfo.ownerName }, function(err, loggedInUser) { 
                    loggedInUser.myprojects = loggedInUser.myprojects.filter(function(e) {return e !== _id})
                    loggedInUser.save();
                });


                const newMap = MapInfo.findOneAndDelete({map_id: _id}, function (err, map) {
                    if(err) {
                        console.log("Could not find mapInfo related to map with _id " + _id);
                    }
                    console.log("Deleted MapInfo related to map with _id " + _id)
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
        const {  _id } = req.body;
        if(!_id){
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }
        Map.findOne({_id: _id}, function (err, docs) {
            if (err){
                console.log(err)
                return res.status(404).json({
                    message: "Map not found!"
                }).send();
            }
            else{
                return res.status(200).json({
                    success:true,
                   docs 
                }).send();
                
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