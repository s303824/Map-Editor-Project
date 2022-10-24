const Tileset = require('../model/tileset-model')

registerTileSet = async (req, res) => {
    try {
        const { 
        backgroundcolor, columns, fillmode, firstgid, grid, image, imageheight, imagewidth, margin, name,
        objectalignment, properties, source, tilecount, tileslateversion, tileheight, tilerendersize, tiles,
        tilewidth, transparentcolor, type, version, wangsets
         } = req.body;
        if (!(backgroundcolor && columns && fillmode && firstgid && grid 
            && image && imageheight && imagewidth && margin && name && objectalignment && properties
            && source && tilecount && tileslateversion && tileheight && tilerendersize && tiles && tilewidth
            && transparentcolor && type && version && wangsets)) {
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }
        const existingTileSet = await Tileset.findOne({ name: name });
        if (existingTileSet) {
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: "A tileset with the same name already exists."
                })
        }

        const newTileSet = new Tileset({
            backgroundcolor, columns, fillmode, firstgid, grid, image, imageheight, imagewidth, margin, name,
        objectalignment, properties, source, tilecount, tileslateversion, tileheight, tilerendersize, tiles,
        tilewidth, transparentcolor, type, version, wangsets
        });
        const savedTileSet = await newTileSet.save();

        await res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }).status(200).json({
            success: true,
            Tileset: {
                backgroundcolor: savedTileSet.backgroundcolor,
                columns: savedTileSet.columns,
                fillmode: savedTileSet.fillmode,
                firstgid: savedTileSet.firstgid,
                grid: savedTileSet.grid,
                image: savedTileSet.image,
                imageheight: savedTileSet.imageheight,
                imagewidth: savedTileSet.imagewidth,
                margin: savedTileSet.margin,
                name: savedTileSet.name,
                objectalignment: savedTileSet.objectalignment,
                properties: savedTileSet.properties,
                source: savedTileSet.source,
                tilecount: savedTileSet.tilecount,
                tileslateversion: savedTileSet.tileslateversion,
                tileheight: savedTileSet.tileheight,
                tilerendersize: savedTileSet.tilerendersize,
                tiles: savedTileSet.tiles,
                tilewidth: savedTileSet.tilewidth,
                transparentcolor: savedTileSet.transparentcolor, 
                type: savedTileSet.type, 
                version: savedTileSet.version, 
                wangsets: savedTileSet.wangsets
            }
        }).send();
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

deleteTileSet = async (req, res) => {
    try{
        const {  name } = req.body;
        if(!name){
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }
        Tileset.findByIdAndDelete(name, function (err, docs) {
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

updateTileSet = async (req, res) => {
    const { backgroundcolor, columns, fillmode, firstgid, grid, image, imageheight, imagewidth, margin, name,
        objectalignment, properties, source, tilecount, tileslateversion, tileheight, tilerendersize, tiles,
        tilewidth, transparentcolor, type, version, wangsets } = req.body;
    const selectedTileSet = await Tileset.findOne({ infoId: infoId });

    Tileset.findByIdAndUpdate(name, {
        backgroundcolor: backgroundcolor,
        columns: columns,
        fillmode: fillmode,
        firstgid: firstgid,
        grid: grid,
        image: image,
        imageheight: imageheight,
        imagewidth: imagewidth,
        margin: margin,
        objectalignment: objectalignment,
        properties: properties,
        source: source,
        tilecount: tilecount,
        tileslateversion: tileslateversion,
        tileheight: tileheight,
        tilerendersize: tilerendersize,
        tiles: tiles,
        tilewidth: tilewidth,
        transparentcolor: transparentcolor, 
        type: type, 
        version: version, 
        wangsets: wangsets
    }, function (err, docs) {
        if (err){
            console.log(err)
            res.status(500).send();
        }
        else{
            console.log("Updated TileSet: ", docs);
        }
    });
}

getTileSet = async (req, res) => {
    try{
        const {  name } = req.body;
        if(!name){
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }
        Tileset.findById(name, function (err, docs) {
            if (err){
                console.log(err)
            }
            else{
                console.log("Tileset Information: ", docs);
                return docs;
            }
        })
    } catch (err){
        console.error(err);
        res.status(500).send();
    }
}

module.exports = {
    registerTileSet,
    deleteTileSet,
    updateTileSet,
    getTileSet
}