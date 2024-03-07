const { Car } = require("../database/models");
const { validateCar } = require("../config/types");
const createCar = async (req, res) => {
  try {
    console.log(req.body);
    const { error } = validateCar(req.body);
    if (error) {
      return res.status(400).send(error.details);
    }
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: "Images not found",
      });
    }
    if (req.files && req.files.length > 0) {
      // Extract URLs from Cloudinary response and store them in the array
      uploadedImages = req.files.map((file) => file.path);
    }
    console.log("Files uploaded:", req.files);
    // Create /a new car entry
    const car = await Car.create({
      user: req.user._id,
      carModel: req.body.carModel,
      price: req.body.price,
      phoneNumber: req.body.phoneNumber,
      maxPictures: req.body.maxPictures,
      pictures: uploadedImages,
    });

    res.status(200).json({
      status: "success",
      message: "Car Has been added  ",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const getAllCars = async (req, res) => {
  try {
    console.log(req.user)
    const cars = await Car.find({user: req.user._id}).populate("user", { name: 1, email: 1 });
    // console.log(cars);
    res.status(200).json(cars);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
module.exports = {
  createCar,
  getAllCars,
};
