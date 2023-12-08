//server.js
require('dotenv').config()

const express = require('express')

const mongoose = require('mongoose')

const http = require('http');

const socketIo = require('socket.io');

// routes
const circlesRoutes = require('./routes/circles')
const userRoutes = require('./routes/user')


// express app
const app = express()

const server = http.createServer(app);

const io = socketIo(server);

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/circles', circlesRoutes)
app.use('/api/user', userRoutes)

const port = 5000;

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
      
      server.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
