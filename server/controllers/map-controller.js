const Map = require('../model/map-model')

registerMap = async (req, res) => {
    try {
        const { mapId, backgroundcolor, height, infinite, layers, mapInfo, nextLayerId, 
            nextObjectId, renderOrder, tileslateVersion, tileHeight, tilesets, 
            tileWidth, version, width } = req.body;
        if (!(mapId, backgroundcolor && height && infinite && layers && mapInfo 
            && nextLayerId && nextObjectId && renderOrder && tileslateVersion 
            && tileHeight && tilesets && tileWidth && version && width)) {
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }
        const existingMap = await Map.findOne({ mapId: mapId });
        if (existingMap) {
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: "A map with the same ID already exists."
                })
        }

        const newMap = new Map({
            mapId,
            backgroundcolor,    // Hex-formatted color
            height,                // Number of tile rows
            infinite,          // Whether the map has infinite dimensions
            layers,              // Array of Layers
            mapInfo,      // Project meta-data
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
        const savedMap = await newMap.save();

        await res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }).status(200).json({
            success: true,
            map: {
                mapId: savedMap.mapId,
                backgroundcolor: savedMap.backgroundcolor,    // Hex-formatted color
                height: savedMap.height,                // Number of tile rows
                infinite: savedMap.infinite,          // Whether the map has infinite dimensions
                layers: savedMap.layers,              // Array of Layers
                mapInfo: savedMap.mapInfo,      // Project meta-data
                nextlayerid: savedMap.nextlayerid,           // Auto-increments for each layer
                nextobjectid: savedMap.nextobjectid,          // Auto-increments for each placed object
                renderorder: savedMap.renderorder,   // right-down (the default), right-up, left-down or left-up
                tiledversion: savedMap.tiledversion,        // The Tiled version used to save the file
                tileheight: savedMap.tileheight,             // Map grid height
                tilesets: savedMap.tilesets,             // Array of Tilesets
                tilewidth: savedMap.tilewidth,              // Map grid width
                version: savedMap.version,             // The JSON format version
                width: savedMap.width                  // Number of tile columns
            }
        }).send();
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

deleteMap = async (req, res) => {
    try{
        const {  mapId } = req.body;
        if(!mapId){
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }
        Map.findByIdAndDelete(mapId, function (err, docs) {
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
    const selectedMap = await Map.findOne({ mapId: mapId });

    Map.findByIdAndUpdate(selectedMap.mapId, {
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
        const {  mapId } = req.body;
        if(!mapId){
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }
        Map.findById(mapId, function (err, docs) {
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