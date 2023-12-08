//server.js
require('dotenv').config()

const express = require('express')

const mongoose = require('mongoose')

const http = require('http');

const socketIo = require('socket.io');

// routes
const circlesRoutes = require('./routes/circles')
const userRoutes = require('./routes/user')
const messageRoutes = require('./routes/messages')

// express app
const app = express()

const server = http.createServer(app);

const io = socketIo(server);

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    res.header('Access-Control-Allow-Origin', '*');
    next()
})

// routes
app.use('/api/circles', circlesRoutes)
app.use('/api/user', userRoutes)
app.use('/api/messages', messageRoutes)

io.on('connection', (socket) => {
    console.log('User connected');
  
    socket.on('message', (messageData) => {
      const { text, user } = messageData;
  
      const message = new Message({ text, user });
      message.save((err) => {
        if (err) {
          console.error('Error saving message to MongoDB:', err);
        } else {
          io.emit('message', messageData);
        }
      });
    });
  
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

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
    