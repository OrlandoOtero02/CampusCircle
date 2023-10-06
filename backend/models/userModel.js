// userModel.js
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
  
    joinedCircles: [
        {
            type: String
        }
    ],
    // New fields for following and followers
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    birthdate: {
        type: Date,
        required: true,
    }
})

//static signup method
userSchema.statics.signup = async function (email, password, username, birthdate) {

    // Validation for birthdate
    const currentDate = new Date();
    const thisYear = currentDate.getFullYear();

    const birthdayInput = new Date(birthdate);
    const birthYear = birthdayInput.getFullYear();

    console.log(thisYear);
    console.log(birthYear);

    const age = thisYear - birthYear;

    // Check if the user is younger than 16
    if (age < 16) {
        throw new Error('You must be at least 16 years old to sign up.');
    }

     // Other validation
    if (!email || !password || !username) {
        throw Error('All fields must be filled')
    }
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }
    if (!email.endsWith('@purdue.edu')) {
        throw Error('Email is not very purduey')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password is not strong enough')
    }
    const usernameLength = username.length;
    if (usernameLength < 5) {
        throw Error ('Username is too short')
    }
    if (usernameLength > 16) {
        throw Error ('Username is too long')
    }

    const existsE = await this.findOne({ email })

    if (existsE) {
        throw Error('Email already in use')
    }

    const existsU = await this.findOne({ username })

    if (existsU) {
        throw Error('Username already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash, username, birthdate})

    return user
}

// static login method
userSchema.statics.login = async function(username, password) {

    if (!username || !password) {
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({ username })

    if (!user) {
        throw Error('Incorrect username')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Incorrect password')
    }

    return user
}

module.exports = mongoose.model('User', userSchema)