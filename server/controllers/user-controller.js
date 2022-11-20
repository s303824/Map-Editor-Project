const auth = require('../auth')
const User = require('../model/user-model')
const bcrypt = require('bcryptjs')
const Map = require('../model/map-model')
const MapInfo = require('../model/mapInfo-model')

registerUser = async (req, res) => {
    try {
        const { _id, username, email, password, passwordVerify, first_name, last_name } = req.body;
        if (!email || !password || !passwordVerify || !username || !first_name || !last_name) {
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }
        if (password.length < 8) {
            return res
                .status(400)
                .json({
                    errorMessage: "Please enter a password of at least 8 characters."
                });
        }
        if (password !== passwordVerify) {
            return res
                .status(400)
                .json({
                    errorMessage: "Please enter the same password twice."
                })
        }
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: "An account with this email address already exists."
                })
        }
        const existingUser2 = await User.findOne({ username: username });
        if (existingUser2) {
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: "An account with this username already exists."
                })
        }

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(password, salt);
        
        const liked_projects = []
        const disliked_projects = []
        const myprojects = []
        const profile_picture = ""
        const publishedMaps = []

        const newUser = new User({
            username, email, passwordHash, first_name, last_name, liked_projects, disliked_projects, myprojects, profile_picture, publishedMaps
        });

        if(_id) {
            newUser._id = _id
        }

        const savedUser = await newUser.save();

        // LOGIN THE USER
        const token = auth.signToken(savedUser);

        await res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }).status(200).json({
            success: true,
            user: savedUser
        }).send();
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

login = async(req, res) => {
    const { email, username, password } = req.body;
    const loggedInUser = await User.findOne({ email: email });
    if (!loggedInUser) {
        return res.status(400).json({errorMessage:"User not found, please check you have entered the correct email address and password"});
    }
    const passwordCorrect = await bcrypt.compare(password, loggedInUser.passwordHash);
    if(!passwordCorrect) {
        return res.status(400).json({errorMessage:"User not found, please check you have entered the correct email address and password"});
    }
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const passwordHash = await bcrypt.hash(password, salt);

    // LOGIN THE USER
    const token = auth.signToken(loggedInUser);

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    }).status(200).json({
        success: true,
        user: loggedInUser
    }).send();
}

getLoggedIn = async (req, res) => {
    auth.verify(req, res, async function () {
        const loggedInUser = await User.findOne({ _id: req.userId });
        if(!loggedInUser) {
            return res.status(200).json({
                loggedIn: false,
                user: null
            })
        }

        return res.status(200).json({
            loggedIn: true,
            user: loggedInUser
        })
    })
}

logout = async(req, res) => {
    const token = auth.signToken(null);

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    }).status(200).json({
        success: true,
        user: null
    })
}

updateUser = async(req, res) => {
    
    const { email, username, first_name, last_name, _id, myprojects, liked_projects, disliked_projects, profile_picture, publishedMaps } = req.body;

    if (!req.body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    const loggedInUser = await User.findOne({ _id: _id });
    const body = req.body
    if (!loggedInUser) {
        return res.status(400).json({errorMessage:"User not found"});
    }

    if(loggedInUser.username != username) {
        const sameName = await User.findOne({username: username})
        if(sameName) {
            return res.status(400).json({errorMessage: "Username already taken!"})
        }
    }

    if(loggedInUser.email != email) {
        const sameName = await User.findOne({email: email})
        if(sameName) {
            return res.status(400).json({errorMessage: "Email already taken!"})
        }
    }

    loggedInUser.first_name = first_name;
    loggedInUser.last_name = last_name;
    loggedInUser.username = username;
    loggedInUser.email = email;

    loggedInUser.myprojects = myprojects
    loggedInUser.liked_projects = liked_projects
    loggedInUser.disliked_projects = disliked_projects
    
    loggedInUser.profile_picture = profile_picture
    loggedInUser.publishedMaps = publishedMaps

    // for each map in loggedInUser's myprojects array, save changes onto that map's creator array
    let index = 0
    loggedInUser.myprojects.forEach(async id => {
        const project = await MapInfo.findOne({_id : id})
        if(project == null) {
            return;
        }
        index = project.creator.findIndex(item => item._id == loggedInUser._id)
        project.creator[index] = {_id:loggedInUser._id, creator: username, email:email, profile_picture:profile_picture}
        project.markModified("creator")
        project.save()
    });

    // for each map in loggedInUser's publishedMaps array, save changes onto that map's creator array
    loggedInUser.publishedMaps.forEach(async id => {
        const project = await MapInfo.findOne({_id : id})
        if(project == null) {
            return;
        }
        index = project.creator.findIndex(item => item._id == loggedInUser._id)
        project.creator[index] = {_id:loggedInUser._id, creator: username, email:email, profile_picture:profile_picture}
        project.markModified("creator")
        project.save()
    });

    
    loggedInUser
        .save()
        .then(() => {
            return res.status(200).json({
                success: true,
                username: loggedInUser.username,
                user: loggedInUser,
                message: 'user updated!',
            })
        })
        .catch(error => {
            console.log((error));
            return res.status(404).json({
                error,
                message: 'user not updated!',
            })
        })

}

changePassword = async(req, res) => {
    const { id, currentPassword, password, passwordVerify} = req.body;
    if (!req.body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update the Password!',
        })
    }
    if (password !== passwordVerify) {
        return res.status(400).json({
            success: false,
            error: 'New Password must match Password Verify!',
        })
    }
    const loggedInUser = await User.findOne({ _id: id });

    const passwordCorrect = await bcrypt.compare(currentPassword, loggedInUser.passwordHash);
    if(!passwordCorrect) {
        return res.status(400).json({errorMessage:"Wrong Password, please check you have entered your current Password correctly"});
    }
    
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const passwordHash = await bcrypt.hash(password, salt);

    loggedInUser.passwordHash = passwordHash
    loggedInUser.save()
        .then(() => {
            return res.status(200).json({
                success: true,
                username: loggedInUser.username,
                user: loggedInUser,
                message: 'Password updated!',
            })
        })
        .catch(error => {
            console.log((error));
            return res.status(404).json({
                error,
                message: 'Password not updated!',
            })
        })


}

deleteUser = async(req, res) => {
    try{
        const { id } = req.body;
        if (!req.body) {
            return res.status(400).json({
                success: false,
                error: 'You must provide an id to delete',
            })
        }

        const loggedInUser = await User.findOne({ _id: id });

        if (!loggedInUser) {
            return res.status(404).json({errorMessage:"User not found"});
        }

        
        const deletedUser = await User.findOneAndDelete({_id: id});
        return res.status(200).json({
            success:true,
            message: "deleted user successfully!",
            user: loggedInUser
        })
    }catch (err) {
        console.error(err);
        res.status(500).send();
    }
}


module.exports = {
    getLoggedIn,
    registerUser,
    login,
    logout,
    updateUser,
    deleteUser,
    changePassword,
}