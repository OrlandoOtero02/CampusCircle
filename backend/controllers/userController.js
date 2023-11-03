//userController.js
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

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
    const {email, password, username, birthdate} = req.body

    try {
        const user = await User.signup(email, password, username, birthdate)

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

// Block a user
const blockUser = async (req, res) => {
    try {
        const person = await User.findById(req.params.userId)

        if (person.blockedUsers.includes(req.params.blockId)) {
            await User.findByIdAndUpdate(req.params.userId, {
                $pull: { blockedUsers: req.params.blockId }
             });        
            res.status(200).json({ message: 'User unblocked successfully' });
        } else {
            await User.findByIdAndUpdate(req.params.userId, {
                $push: { blockedUsers: req.params.blockId }
            });        
            res.status(200).json({ message: 'User blocked successfully' });
        }


        // Block the user by adding their ID to the blockedUsers array
        // await User.findByIdAndUpdate(req.params.userId, {
        //     $push: { blockedUsers: req.params.blockId }
        // });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Unblock a user
const unblockUser = async (req, res) => {
    try {
        // Unblock the user by removing their ID from the blockedUsers array
        await User.findByIdAndUpdate(req.params.userId, {
            $pull: { blockedUsers: req.params.unblockId }
        });

        res.status(200).json({ message: 'User unblocked successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get blocked users
const getBlockedUsers = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate('blockedUsers');

        const blockedUsers = user.blockedUsers;

        res.status(200).json({ blockedUsers });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getUserById = async (req, res) => {
    //console.log(`made it to getUSERby ID, and req is ${req.params.userId}`)
    try {
      const userId = req.params.userId;
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Return the user's details as JSON
      res.status(200).json({ user });
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

module.exports = {
    loginUser,
    signupUser,
    followUser,
    unfollowUser,
    getUsers,
    getFollowingUsers,
    blockUser,
    unblockUser,
    getBlockedUsers,
    getUserById
};