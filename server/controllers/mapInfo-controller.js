const auth = require('../auth')
const MapInfo = require('../model/mapInfo-model')
const bcrypt = require('bcryptjs')

registerMapInfo = async (req, res) => {
    try {
        const { title, creator, thumbnailURL, comments, likes, 
            dislikes, downloads, map_id, published } = req.body;
        if (!(title && creator && thumbnailURL && comments && likes 
            && dislikes && downloads && map_id && published)) {
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }
        const existingMapInfo = await MapInfo.findOne({ title: title });
        if (existingMapInfo) {
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: "A mapInfo with the same title already exists."
                })
        }

        const newMapInfo = new MapInfo({
            title, 
            creator, 
            thumbnailURL, 
            comments, 
            likes, 
            dislikes, 
            downloads, 
            map_id, 
            published
        });
        const savedMapInfo = await newMapInfo.save();

        await res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }).status(200).json({
            success: true,
            mapInfo: {
                title: savedMapInfo.title, 
                creator: savedMapInfo.creator, 
                thumbnailURL: savedMapInfo.thumbnailURL, 
                comments: savedMapInfo.comments, 
                likes: savedMapInfo.likes, 
                dislikes: savedMapInfo.dislikes, 
                downloads: savedMapInfo.downloads, 
                map_id: savedMapInfo.map_id, 
                published: savedMapInfo.published
            }
        }).send();
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

deleteMapInfo = async (req, res) => {
    try{
        const {  infoId } = req.body;
        if(!infoId){
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }
        MapInfo.findByIdAndDelete(infoId, function (err, docs) {
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
    const { infoId, title, creator, thumbnailURL, comments, likes, 
        dislikes, downloads, published } = req.body;
    const selectedMapInfo = await MapInfo.findOne({ infoId: infoId });

    selectedMapInfo.title = title;
    selectedMapInfo.creator = creator;
    selectedMapInfo.thumbnailURL = thumbnailURL;
    selectedMapInfo.comments = comments;

    selectedMapInfo.likes = likes;
    selectedMapInfo.dislikes = dislikes;
    selectedMapInfo.downloads = downloads;
    selectedMapInfo.published = published;

    MapInfo.findByIdAndUpdate(selectedMapInfo.infoId, {
        title : title,
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
        const {  infoId } = req.body;
        if(!infoId){
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }
        MapInfo.findById(infoId, function (err, docs) {
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
    updateMapgetMapInfo,
    getAllMapInfoByUser
}

