//userController.js
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const upload = require('../middleware/multer'); // Import the multer middleware
const bcrypt = require('bcrypt');

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

// Update user 
const updatePassword = async (req, res) => {
        const { email, newPassword } = req.body;
    
        try {
            const user = await User.findOne({ email: email });
    
            if (!user) {
                return res.status(404).json({ error: 'User not found.' });
            }
    
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
            await user.save();
    
            res.status(200).json({ message: 'Password updated successfully.' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    const updateUserPassword = async (req, res) => {
        const { email, oldPassword, newPassword } = req.body;
    
        try {
            const user = await User.findOne({ email: email });
    
            if (!user) {
                return res.status(404).json({ error: 'User not found.' });
            }
    
            // Compare the provided oldPassword with the hashed password in the database
            const isMatch = await bcrypt.compare(oldPassword, user.password);
    
            if (!isMatch) {
                // If the passwords do not match, send an error response
                return res.status(400).json({ error: 'Your old password is incorrect.' });
            }
    
            // If the passwords match, hash the new password and update it in the database
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
            await user.save();
    
            res.status(200).json({ message: 'Password updated successfully.' });
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

// Get user profile
const getProfile = async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Return the user's profile information
        res.status(200).json({
            username: user.username,
            bio: user.bio,
            interests: user.interests,
            // Add any other profile fields you want to include
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update user profile, including profile picture
const updateProfile = async (req, res) => {
    const userId = req.params.userId;
  
    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          $set: {
            bio: req.body.bio,
            interests: req.body.interests,
            // Add profilePicture to update if it exists in the request
            profilePicture: req.file ? req.file.path : undefined,
          },
        },
        { new: true }
      );
  
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };



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


const deleteUser = async (req, res) => {
    console.log("KILL ME")
    await User.findByIdAndDelete(req.params.Id)
    res.status(200)
}

const updateUserSettings = async (req, res) => {
    const userId = req.params.userId;
  
    try {
      console.log('Request Body:', req.body);
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          $set: {
            dmPreference: req.body.dmPreference
          },
        },
        { new: true }
      );
  
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

      const isAdmin = async (req, res) => {
        try {
          // Assuming you have the user ID available in the request (e.g., from authentication middleware)
          const userId = req.params.Id;
      
          // Fetch the user by ID
          const user = await User.findById(userId);
      
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
      
          // Check if the user is an admin
          
          const isAdmin = user.isAdmin

          console.log(isAdmin)

          res.status(200).json({ isAdmin });
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      }

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
    getUserById,
    deleteUser,
  updatePassword, 
  updateUserPassword,
  getProfile,
  updateProfile,
  updateUserSettings
  isAdmin
};

