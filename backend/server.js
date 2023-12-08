//server.js
require('dotenv').config()

const express = require('express')

const mongoose = require('mongoose')

// routes
const circlesRoutes = require('./routes/circles')
const eventsRoutes = require('./routes/events')
const userRoutes = require('./routes/user')
const reportRoutes = require('./routes/reports')

const messageRoutes = require('./routes/messages')

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/circles', circlesRoutes)
app.use('/api/events', eventsRoutes)
app.use('/api/user', userRoutes)
<<<<<<< HEAD
app.use('/api/report', reportRoutes)

=======
app.use('/api/messages', messageRoutes)
>>>>>>> fd6be09b380418fd968683d795e3c98451c32808

// connect to db
mongoose.connect(process.env.MONGO_URI, {dbName: 'CampusCircle'})
    .then(() => {
    // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })