//userController.js
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// login user
const loginUser = async (req, res) => {
    const {username, password} = req.body

    try {
        const user = await User.login(username, password)

        //create a token
        const token = createToken(user._id)

        res.status(200).json({email: user.email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// signup user
const signupUser = async (req, res) => {
    const {email, password, username} = req.body

    try {
        const user = await User.signup(email, password, username)

        //create a token
        const token = createToken(user._id)

        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Follow a user
const followUser = async (req, res) => {
    const { currentUserId, userIdToFollow } = req.body;

    try {
        // Update the user's following list
        await User.findByIdAndUpdate(currentUserId, {
            $addToSet: { following: userIdToFollow }
        });

        res.status(200).json({ message: 'User followed successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Unfollow a user
const unfollowUser = async (req, res) => {
    const { currentUserId, userIdToUnfollow } = req.body;

    try {
        // Remove the user from the following list
        await User.findByIdAndUpdate(currentUserId, {
            $pull: { following: userIdToUnfollow }
        });

        res.status(200).json({ message: 'User unfollowed successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// get user
const getUsers = async (req, res) => {
    const users = await User.find()
    //console.log(users)
    res.status(200).json({users})
}

module.exports = { loginUser, signupUser, followUser, unfollowUser, getUsers }