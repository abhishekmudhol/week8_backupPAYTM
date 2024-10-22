const mongoose = require('mongoose');
const { DB_URL } = require('../config');

mongoose.connect( DB_URL)

mongoose.connection.on('connected', () => {
    console.log('Connected to a paytm_DB');
}).on('error', (error) => {
    console.log('Error connecting to a paytm_DB:', error.message);
});

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 100
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
})

const User = mongoose.model('User', userSchema)

const accountSchema = new mongoose.Schema({
	userId: {type : mongoose.Schema.Types.ObjectId , ref : 'User' , required: true},
	balance: { type: Number, required: true }    //todo => Store balance in paise (integer)
})

const Account = mongoose.model('Account' , accountSchema)

module.exports = {
    Account,
    User
}