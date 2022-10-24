const auth = require('../auth')
const User = require('../model/user-model')
const bcrypt = require('bcryptjs')

registerUser = async (req, res) => {
    try {
        const { username, email, password, passwordVerify, first_name, last_name } = req.body;
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

        const newUser = new User({
            username, email, passwordHash, first_name, last_name
        });
        const savedUser = await newUser.save();

        // LOGIN THE USER
        const token = auth.signToken(savedUser);

        await res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }).status(200).json({
            success: true,
            user: {
                username: savedUser.username,
                email: savedUser.email,
                id: savedUser._id
            }
        }).send();
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

login = async(req, res) => {
    const { email, username, password } = req.body;
    const loggedInUser = await User.findOne({ username: username });
    if (!loggedInUser) {
        return res.status(400).json({errorMessage:"User not found"});
    }
    const passwordCorrect = await bcrypt.compare(password, loggedInUser.passwordHash);
    if(!passwordCorrect) {
        return res.status(400).json({errorMessage:"Wrong password"});
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
        user: {
            username: loggedInUser.username,
            email: loggedInUser.email,
            id: loggedInUser._id
        }
    }).send();
}

getLoggedIn = async (req, res) => {
    console.log(req.userId)
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
            user: {
                email: loggedInUser.email,
                username: loggedInUser.username,
                id: loggedInUser._id
            }
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

updateUserByName = async(username) => {
    const loggedInUser = await User.findOne({ username: username });
    //loggedInUser
}

updateUser = async(req, res) => {
    
    const { email, username, first_name, last_name, id } = req.body;
    const loggedInUser = await User.findOne({ _id: id });
    const body = req.body

    loggedInUser.first_name = first_name;
    loggedInUser.last_name = last_name;
    loggedInUser.username = username;
    loggedInUser.email = email;

    //loggedInUser.myProjects = myProjects
    //loggedInUser.likedProjects = likedProjects
    //loggedInUser.profilePicture = profilePicture
    //loggedInUser.publishedMaps = publishedMaps

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    if (!loggedInUser) {
        return res.status(400).json({errorMessage:"User not found"});
    }

        loggedInUser
            .save()
            .then(() => {
                console.log("SUCCESS!!!");
                return res.status(200).json({
                    success: true,
                    username: loggedInUser.username,
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


module.exports = {
    getLoggedIn,
    registerUser,
    login,
    logout,
    updateUser
}