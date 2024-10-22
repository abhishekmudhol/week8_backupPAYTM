const express = require('express')
const authMiddleware = require('../middleware/middleware');
const { Account } = require('../db/db');
const { default: mongoose } = require('mongoose');
const accountRouter = express.Router()

accountRouter.get('/balance' , authMiddleware , async(req , res)=>{
    const userId = req.userId;
    try {
        const account = await Account.findOne({
            userId
        })
    
        res.status(200).json({
            accountBalance : account.balance
        })
    } catch (error) {
        console.log(`Error while getting balance from DB ${error.message}`);
        res.status(400).json({
            message : `Error while getting balance from DB`
        })
    }
})

accountRouter.post('/transfer' , authMiddleware , async(req , res) => {
    const {to , amount} = req.body

    if (amount<= 0) {
        res.status(400).json({
            message : `amount should be more than 0`
        })
        return;
    }

    const transfer_session = await mongoose.startSession()
    transfer_session.startTransaction()

    try {
        const userId = req.userId
    
        //TODO=> Find accounts within the transaction
        const accountFrom = await Account.findOne({userId}).session(transfer_session)
        const accountTo = await Account.findOne({userId : to}).session(transfer_session)

        if (!accountFrom ) {
            throw new Error('Invalid account accountFrom1')
        }
        if (!accountTo ) {
            throw new Error('Invalid account accountTo')
        }

        if (accountFrom.balance < amount) {
            throw new Error('Insufficient Balance')
        }

        //TODO=> (OTHER WAY) Performing the transfer here
        // accountFrom.balance = accountFrom.balance - amount
        // await accountFrom.save({transfer_session})

        // accountTo.balance = accountTo.balance + amount
        // await accountTo.save({transfer_session})
        
        //TODO=> Performing the transfer here
        await Account.findOneAndUpdate({userId} , {$inc : {balance : -amount}} ).session(transfer_session)
        await Account.findOneAndUpdate({userId : to} , {$inc : {balance : amount}}).session(transfer_session)
        
        //TODO=> Committing the transactin here
        await transfer_session.commitTransaction()
            transfer_session.endSession()

        res.status(200).json({
            message : `Transaction Successful`
        })

    } catch (error) {
        //TODO=> Abort the transaction in case of error
        await transfer_session.abortTransaction()
        transfer_session.endSession()
        
        res.status(400).json({
            message : `Transaction Failed ${error.message}`
        })
    }
})

module.exports = accountRouter