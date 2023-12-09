//user.js
const express = require('express')

// controller functions

const { loginUser, signupUser, followUser, unfollowUser, getUsers, getFollowingUsers, blockUser, unblockUser, getBlockedUsers, getUserById, deleteUser, updatePassword, updateUserPassword, updateUserSettings, getProfile, updateProfile, isAdmin } = require('../controllers/userController')


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

//updating the user password from login
router.patch('/updatePassword', updatePassword);

//updating the user password from settings
router.patch('/updateUserPassword', updateUserPassword);

// Update security settings
router.patch('/updateUserSettings/:userId', updateUserSettings);

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

router.get('/isAdmin/:Id', isAdmin);

module.exports = router