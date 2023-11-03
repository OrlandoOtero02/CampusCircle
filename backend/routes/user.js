//user.js
const express = require('express')

// controller functions
const { loginUser, signupUser, followUser, unfollowUser, getUsers, getFollowingUsers, deleteUser } = require('../controllers/userController')

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

// delete user
router.delete('/deleteUser/:Id', deleteUser)
module.exports = router