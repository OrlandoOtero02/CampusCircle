const express = require('express')

// controller functions
const { loginUser, signupUser, addCircle } = require('../controllers/userController')

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

router.patch('/add', addCircle)

module.exports = router