const Map = require('../model/map-model')

registerMap = async (req, res) => {
    try {
        const { mapid, backgroundcolor, height, infinite, layers, mapinfo, nextlayerid, 
            nextobjectid, renderorder, tiledversion, tileheight, tilesets, 
            tilewidth, version, width } = req.body;
        if (!(mapid, backgroundcolor && height && infinite && layers && mapinfo 
            && nextlayerid && nextobjectid && renderorder && tiledversion 
            && tileheight && tilesets && tilewidth && version && width)) {
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }
        const existingMap = await Map.findOne({ mapid: mapid });
        if (existingMap != NULL) {
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
        res.status(200).send();
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
        Map.findOneAndDelete({mapid}, function (err, docs) {
            if (err){
                return res.status(404).json({
                    err,
                    message: 'could not find the map!',
                })
            }
            else{
                return res.status(200).json({
                    message: 'Map deleted!',
                    docs
                })
                console.log("Deleted: ", docs);
            }
        })  
    } catch (err){
        console.error(err);
        res.status(500).send();
    }
}

updateMap = async (req, res) => {
    const { mapid, backgroundcolor, height, infinite, layers, nextlayerid, 
        nextobjectid, renderorder, tiledversion, tileheight, tilesets, 
        tilewidth, version, width } = req.body;
    const selectedMap = await Map.findOne({ mapid: mapid });

    if(selectedMap === null){
        return res
            .status(404)
            .json({ errorMessage: "No map found!" });
    }

    Map.findOneAndUpdate(selectedMap.mapid, {
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
                docs
            }).send()
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
        Map.findOne({mapid}, function (err, docs) {
            if (err){
                console.log(err)
                return res.status(404).json({
                    message: "Map not found!"
                }).send();
            }
            else{
                console.log("Map: ", docs);
                return res.status(200).json({
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