const { Car } = require("../database/models");
const { validateCar } = require("../config/types");
const createCar = async (req, res) => {
  try {
    const { error } = validateCar(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    if (!req.files) {
      return res.status(400).json({
        message: "Images not found",
      });
    }
    const uploadedImages = req.files.map((file) => file.path);
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
    const cars = await Car.find().populate("user", { password: 0 });
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
