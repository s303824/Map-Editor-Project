const Tileset = require('../model/tileset-model')

registerTileSet = async (req, res) => {
    try {
        const { 
        _id, backgroundcolor, columns, fillmode, firstgid, grid, image, imageheight, imagewidth, margin, name,
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
       /* if (existingTileSet) {
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: "A tileset with the same name already exists."
                })
        }*/

        const newTileSet = new Tileset({
            backgroundcolor, columns, fillmode, firstgid, grid, image, imageheight, imagewidth, margin, name,
        objectalignment, properties, source, tilecount, tileslateversion, tileheight, tilerendersize, tiles,
        tilewidth, transparentcolor, type, version, wangsets
        });

        if(_id) {
            newTileSet._id = _id
        }

        await Tileset.create(newTileSet);
        res.status(200).json({
            success: true,
            tileset: newTileSet,
            _id: newTileSet._id
        });
        return newTileSet;
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

deleteTileSet = async (req, res) => {
    try{
        const {  _id } = req.body;
        if(!_id){
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }
        Tileset.findOneAndDelete({_id: _id}, function (err, docs) {
            if (err){
                console.log(err)
            }
            else{
                return res.status(200).json({
                    success:true,
                    tileset: docs
                })
            }
        })
    } catch (err){
        console.error(err);
        res.status(500).send();
    }
}

updateTileSet = async (req, res) => {
    const { _id, backgroundcolor, columns, fillmode, firstgid, grid, image, imageheight, imagewidth, margin, name,
        objectalignment, properties, source, tilecount, tileslateversion, tileheight, tilerendersize, tiles,
        tilewidth, transparentcolor, type, version, wangsets } = req.body;
    

    Tileset.findOneAndUpdate({_id: _id}, {
        _id: _id,
        backgroundcolor: backgroundcolor,
        columns: columns,
        fillmode: fillmode,
        firstgid: firstgid,
        grid: grid,
        image: image,
        imageheight: imageheight,
        imagewidth: imagewidth,
        margin: margin,
        name: name,
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
            return res.status(200).json({
                success:true,
                tileset: docs
            })
        }
    });
}

getTileSet = async (req, res) => {

    console.log("---------------------")
    console.log(req.query)
    console.log("---------------------")
    try{
        const { _id } = req.query;
        if(!_id){
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }
        Tileset.findOne({_id: _id}, function (err, docs) {
            if (err){
                console.log(err)
            }
            else{
                return res.status(200).json({
                    success: true,
                    tileset: docs
                })
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