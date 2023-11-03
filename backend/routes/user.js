//user.js
const express = require('express')

// controller functions
const { loginUser, signupUser, followUser, unfollowUser, getUsers, getFollowingUsers, getProfile, updateProfile } = require('../controllers/userController')

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

// follow user
router.put('/follow/:userId/:Id', followUser)

// unfollow user
router.put('/unfollow/:userId/:Id', unfollowUser)

// get all users
router.get('/', getUsers)

// get following users
router.get('/getFollowingUsers/:Id', getFollowingUsers)

// get user profile
router.get('/profile/:userId', getProfile)

// updating the user profile
router.patch('/profile/:userId', updateProfile)

module.exports = router