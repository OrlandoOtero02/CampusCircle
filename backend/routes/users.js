const express = require('express')

const User = require('../models/User')

const router = express.Router()

// GET all users
router.get('/', (req, res) => {
    res.json({
        msg: 'GET all users'
    })
})

// GET a single user
router.get('/:id', (req, res) => {
    res.json({
        msg: 'GET a single user'
    })
})

// POST a new user
router.post('/', async (req, res) => {
    const {username, email, password, profilePicture,followers, followings, birthday,interests, circlesFollowed,isAdmin, desc} = req.body

    try {
        const user = await User.create({username, email, password, profilePicture,followers, followings, birthday,interests, circlesFollowed,isAdmin, desc})
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

// DELETE a user
router.delete('/:id', (req, res) => {
    res.json({
        msg: 'DELETE a user'
    })
})

// UPDATE a user
router.patch('/:id', (req, res) => {
    res.json({
        msg: 'UPDATE a user'
    })
})

module.exports = router