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

        res.status(200).json({email: user.email, token, _id: user._id})
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

        res.status(200).json({email, token, _id: user._id})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Follow a user
const followUser = async (req, res) => {
    const person = await User.findById(req.params.Id)

    
    try {
        if (person.following.includes(req.params.userId)) {
            await User.findByIdAndUpdate(req.params.Id, {
                $pull: { following: req.params.userId }
             });        
            res.status(200).json({ message: 'User unfollowed successfully' });
        } else {
            await User.findByIdAndUpdate(req.params.Id, {
                $push: { following: req.params.userId }
            });        
            res.status(200).json({ message: 'User followed successfully' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Unfollow a user
const unfollowUser = async (req, res) => {
    try {
        // Remove the user from the following list
        await User.findByIdAndUpdate(req.params.Id, {
            $pull: { following: req.params.userId }
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

// get following users
const getFollowingUsers = async (req, res) => {
    const person = await User.findById(req.params.Id).populate("following")

    const following = person.following
    //console.log(users)
    res.status(200).json({following})
}

module.exports = { loginUser, signupUser, followUser, unfollowUser, getUsers, getFollowingUsers }