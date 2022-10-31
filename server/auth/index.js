const jwt = require("jsonwebtoken")
secret = "r(4[CaQ3`N<#8EV~7<K75Rd/ZpfzBkv`m-x]+QnjQcXazr%w"

function authManager() {
    verify = function (req, res, next) {
        try {
            const token = req.cookies.token;
            if (!token) {
                return res.status(401).json({
                    loggedIn: false,
                    user: null,
                    errorMessage: "Unauthorized"
                })
            }

            const verified = jwt.verify(token, secret)
            req.userId = verified.userId;

            next();
        } catch (err) {
            console.error(err);
            return res.status(401).json({
                errorMessage: "Unauthorized"
            });
        }
    }

    signToken = function (user) {
        if(!user) {
            return jwt.sign({
                userId: null
            }, secret);
        }
        return jwt.sign({
            userId: user._id
        }, secret);
    }

    return this;
}

const auth = authManager();
module.exports = auth;