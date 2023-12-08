// multer.js

const multer = require('multer');

// Configure the storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Set the directory where uploaded files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

// Create a multer instance with the configured storage
const upload = multer({ storage });

module.exports = upload;
