const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userValidationSchema = require('../zodValidation/signUpValidation');
const { User, Account } = require('../db/db');
const { JWT_SECRET } = require('../config');
const signinValidation = require('../zodValidation/signInvalidation');
const authMiddleware = require('../middleware/middleware');
const updateValidation = require('../zodValidation/updateValidation');
const userRouter = express.Router()

async function createHash(plainPassword){
    let hashValue
    try {
        const salt = await bcrypt.genSalt(8)
        hashValue = await bcrypt.hash(plainPassword , salt)
    } catch (error) {
        console.log(`Error thrown by a createHash function ${error.message}`)
    }
    return hashValue
}

async function comparePassword(plainPassword , hashValue) {
    let isMatch
    try {
        isMatch = await bcrypt.compare(plainPassword , hashValue)
    } catch (error) {
        console.log(`Error thrown by a comparePassword function ${error.message}`);
    }
    return isMatch
}

userRouter.post('/signup',async (req,res)=>{
    const userInfo = req.body
    const result = userValidationSchema.safeParse(userInfo)

    if (!result.success) {
        res.status(400).json({
            message : `Invalid Input ${result.error}`
        })
        return
    }

    const existingUser  = await User.findOne({username : userInfo.username})
    if (existingUser) {
        res.status(400).json({
            message: `Given Email already taken`
        })
        return
    }

    const hashValue = await createHash(userInfo.password)

    const newUser = new User({...userInfo , password: hashValue})
    let createdUser;
    try {
        createdUser = await newUser.save()
    } catch (error) {
        console.error(`Error while saving user ${error.message}`)
        return
    }
    //TODO=> ----- Create new account ------
    try {
        let newAccount = new Account({
            userId : createdUser._id,
            balance : 1 + Math.random() * 10000
        })

        const savedAccount = await newAccount.save()
    } catch (error) {
        console.error(`Error while saving Account ${error.message}`)
        return
    }

    const token = jwt.sign({userId : createdUser._id} , JWT_SECRET)
    res.status(200).json({
        message: "User created successfully",
        token
    })
})

userRouter.post('/signin' ,async (req , res)=>{
    try {
        const userInfo = req.body

        const {success} = signinValidation.safeParse(userInfo)
        if (!success) {
            res.status(400).json({
                message: "Incorrect inputs"
            })
            return
        }

        let existingUser
        try {
            existingUser = await User.findOne({username : userInfo.username})
            if (!existingUser) {
                res.status(400).json({
                    message : `User Not Exist....signUp`
                })
                return
            }
        } catch (error) {
            return console.log(`ERROR WHILE FINDING USER ${error.message}`);
        }
        const isMatch = await comparePassword(userInfo.password , existingUser.password)
        if (!isMatch) {
            res.status(400).json({
                message : `Wrong password`
            })
            return
        }
        const token = jwt.sign({userId : existingUser._id} , JWT_SECRET)
        res.status(200).json({
            token
        })
        
    } catch (error) {
        res.status(411).json({
            message: "Error while logging in"
        })
    }
})

userRouter.put('/' , authMiddleware , async (req , res)=>{
    const updates = req.body 
    const userId = req.userId

    const {success} = updateValidation.safeParse(updates)
    
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
        return
    }

    try {
        const updates = {}; 

        if (req.body.password) {
            const hashPassword =  await createHash(req.body.password)
            updates.password = hashPassword;
        }
        if (req.body.firstName) updates.firstName = req.body.firstName;
        if (req.body.lastName) updates.lastName = req.body.lastName;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updates },
            { new: true }
        );
        
        if (updatedUser) {
            res.status(200).json({
                message: "Updated successfully"
            })
            return
        }
    } catch (error) {
        res.status(400).json({
            message : `Error while updating user ${error.message}`
        })
    }
})

userRouter.get('/bulk' , authMiddleware , async (req , res)=>{
    const filter = req.query.filter || ""             // todo =>  ?filter=harkirat   {filter : 'harkirat'}
    
    try {
        const users = await User.find(
            {
                $and : [
                    {
                        $or: [
                            { firstName: { $regex: new RegExp(filter, 'i') } },  
                            { lastName: { $regex: new RegExp(filter, 'i') } }
                        ]
                    },
                    {
                        _id: { $ne: req.userId }
                    }
                ]
            },
            {
                username: 1,                         // todo => Projection Object
                firstName: 1,
                lastName: 1,
            }
        );
        
        res.status(200).json({
            users
        })

    } catch (error) {
        res.status(400).json({
            message : `Error while getting users from DB ${error.message}`
        })
    }
})

module.exports = userRouter