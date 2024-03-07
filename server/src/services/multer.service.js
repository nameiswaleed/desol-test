const express = require("express");
const multer = require("multer");
const app = express();

// Set up multer storage for local storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set destination folder
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // Set file name
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Initialize multer with the storage configuration
const uploader = multer({ storage: storage });

module.exports = { uploader };
