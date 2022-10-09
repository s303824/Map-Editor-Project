const auth = require('../auth')
const User = require('../models/user-model')
const bcrypt = require('bcryptjs')

registerUser = async (req, res) => {
    try {
        const { username, email, password, passwordVerify } = req.body;
        if (!email || !password || !passwordVerify || !username) {
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
            username, email, passwordHash, 
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
            }
        }).send();
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}


module.exports = {
    //getLoggedIn,
    registerUser,
    //login,
    //logout,
    //updateUser
}