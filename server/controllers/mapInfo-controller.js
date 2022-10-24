const MapInfo = require('../model/mapInfo-model')

registerMapInfo = async (req, res) => {
    try {
        const { name, creator, thumbnailURL, comments, likes, 
            dislikes, downloads, map_id, published } = req.body;
        if (!(name && creator && thumbnailURL && comments && likes 
            && dislikes && downloads && map_id && published)) {
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }
        const existingMapInfo = await MapInfo.findOne({ map_id: map_id });
        if (existingMapInfo) {
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: "A mapInfo with the same name already exists."
                })
        }

        const newMapInfo = new MapInfo({
            name, 
            creator: [creator], 
            thumbnailURL, 
            comments, 
            likes, 
            dislikes, 
            downloads, 
            map_id, 
            published
        });
        
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
        const {  map_id } = req.body;
        if(!map_id){
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }
        MapInfo.findOneAndDelete({_id: _id}, function (err, docs) {
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

updateMapInfo = async (req, res) => {
    const { map_id, name, creator, thumbnailURL, comments, likes, 
        dislikes, downloads, published } = req.body;
    const selectedMapInfo = await MapInfo.findOne({ map_id: map_id });

    selectedMapInfo.name = name;
    selectedMapInfo.creator = creator;
    selectedMapInfo.thumbnailURL = thumbnailURL;
    selectedMapInfo.comments = comments;

    selectedMapInfo.likes = likes;
    selectedMapInfo.dislikes = dislikes;
    selectedMapInfo.downloads = downloads;
    selectedMapInfo.published = published;

    MapInfo.findOneAndUpdate({_id: _id}, {
        name : name,
        creator : creator,
        thumbnailURL : thumbnailURL,
        comments : comments,
        likes : likes,
        dislikes : dislikes,
        downloads : downloads,
        published : published
    }, function (err, docs) {
        if (err){
            console.log(err)
            res.status(500).send();
        }
        else{
            console.log("Updated MapInfo: ", docs);
        }
    });
}

getMapInfo = async (req, res) => {
    try{
        const {  map_id } = req.body;
        if(!map_id){
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }
        MapInfo.findOne({_id: _id}, function (err, docs) {
            if (err){
                console.log(err)
            }
            else{
                console.log("Map Information: ", docs);
                return docs;
            }
        })
    } catch (err){
        console.error(err);
        res.status(500).send();
    }
}

getAllMapInfoByUser = async (req, res) => {
    try{
        const {  user } = req.body;
        if(!user){
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }
        MapInfo.find({ownerName: user}, function (err, docs) {
            if (err){
                console.log(err)
            }
            else{
                console.log("Map Information: ", docs);
                return docs;
            }
        })
    } catch (err){
        console.error(err);
        res.status(500).send();
    }
}

module.exports = {
    registerMapInfo,
    deleteMapInfo,
    updateMapInfo,
    getMapInfo,
    getAllMapInfoByUser
}
