// models/cars.js
const mongoose = require("mongoose");
const Joi = require("joi");

const carSchema = new mongoose.Schema({
  carModel: {
    type: String,
    required: true,
    minlength: 3,
  },
  price: {
    type: Number,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  maxPictures: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
  },
  pictures: [
    {
      type: String,
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
});

const Car = mongoose.model("Car", carSchema,'Cars');

module.exports = Car
