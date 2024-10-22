const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const { User } = require('../db/db');

async function authMiddleware (req , res , next){
    const authToken = req.headers.authorization

    if (!authToken) {
        res.status(400).json({
            message : `token required`
        })
        return
    }

    let token;
    if (authToken.startsWith('Bearer ')) {
        token = authToken.split(' ')[1]
    }else{
        if (authToken.startsWith('Bearer')) {
            token = authToken.substring(6);
        } else {
            token = authToken
        }
    }

    try {
        const decoded = jwt.verify(token , JWT_SECRET)
        const userId = decoded.userId

        try {
            const existingUser = await User.findById(userId)  //Todo => No need to make DB call
            if (existingUser) {
                req.userId = existingUser._id;
                //todo=> req.userId = decoded.userId;
                next()
            } else {
                res.status(403).json({
                    message :"Not Authenticated"
                })
            }
        } catch (error) {
            res.status(400).json({
                message : `Error while auth middleware`
            })
        }

    } catch (error) {
        console.error('Token verification is failed:', error.message);
        res.status(404).json({
            message : "Token verification is failed"
        })
    }
}

module.exports = authMiddleware