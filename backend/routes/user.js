//user.js
const express = require('express')

// controller functions

const { loginUser, signupUser, followUser, unfollowUser, getUsers, getFollowingUsers, blockUser, unblockUser, getBlockedUsers, getUserById, deleteUser } = require('../controllers/userController')


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


// Block user
router.put('/block/:userId/:blockId', blockUser);

// Unblock user
router.put('/unblock/:userId/:unblockId', unblockUser);

// Get blocked users
router.get('/blockedUsers/:userId', getBlockedUsers);

// get user by id
router.get('/getUserById/:userId', getUserById);

//delete user
router.delete('/deleteUser/:Id', deleteUser)

module.exports = router