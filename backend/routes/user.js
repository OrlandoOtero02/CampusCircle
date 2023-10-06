//user.js
const express = require('express')

// controller functions
const { loginUser, signupUser, followUser, unfollowUser, getUsers } = require('../controllers/userController')

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

// follow user
router.post('/follow/:userId', followUser)

// unfollow user
router.post('/unfollow/:userId', unfollowUser)

// get all users
router.get('/', getUsers)

module.exports = router