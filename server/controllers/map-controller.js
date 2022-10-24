const Map = require('../model/map-model')

registerMap = async (req, res) => {
    try {
        const { mapid, backgroundcolor, height, infinite, layers, mapInfo, nextlayerid, 
            nextobjectid, renderorder, tileslateversion, tileheight, tilesets, 
            tilewidth, version, width } = req.body;
        if (!(mapid, backgroundcolor && height && infinite && layers && mapInfo 
            && nextlayerid && nextobjectid && renderorder && tileslateversion 
            && tileheight && tilesets && tilewidth && version && width)) {
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }
        const existingMap = await Map.findOne({ mapid: mapid });
        if (existingMap) {
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: "A map with the same ID already exists."
                })
        }

        const newMap = new Map({
            mapid,
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
        await Map.create(newMap);
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

deleteMap = async (req, res) => {
    try{
        const {  mapid } = req.body;
        if(!mapid){
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }
        Map.findByIdAndDelete(mapid, function (err, docs) {
            if (err){
                console.log(err)
            }
            else{
                console.log("Deleted: ", docs);
            }
        })
    } catch (err){
        console.error(err);
        res.status(500).send();
    }
}

updateMap = async (req, res) => {
    const { backgroundcolor, height, infinite, layers, mapInfo, nextLayerId, 
        nextObjectId, renderOrder, tileslateVersion, tileHeight, tilesets, 
        tileWidth, version, width } = req.body;
    const selectedMap = await Map.findOne({ mapid: mapid });

    Map.findByIdAndUpdate(selectedMap.mapid, {
        backgroundcolor : backgroundcolor,
        height : height, 
        infinite : infinite,
        layers : layers,
        nextLayerId : nextLayerId,
        nextObjectId : nextObjectId,
        renderOrder : renderOrder,
        tileslateVersion : tileslateVersion,
        tileHeight : tileHeight,
        tilesets : tilesets,
        tileWidth : tileWidth,
        version : version,
        width : width
    }, function (err, docs) {
        if (err){
            console.log(err)
            res.status(500).send();
        }
        else{
            console.log("Updated Map: ", docs);
        }
    });
}

getMap = async (req, res) => {
    try{
        const {  mapid } = req.body;
        if(!mapid){
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }
        Map.findById(mapid, function (err, docs) {
            if (err){
                console.log(err)
            }
            else{
                console.log("Map: ", docs);
                return docs;
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