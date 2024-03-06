const express = require("express");
const productsRouter = express.Router();
const { authMiddleware } = require("../middlewares");
const { createCar, getAllCars } = require("../controller/car.controller");
const upload = require("../services/storage.service").upload;
// routes
productsRouter.post("/", authMiddleware, upload.array("pictures"), createCar);
productsRouter.get("/", authMiddleware, getAllCars);
//exporting routes
module.exports = productsRouter;
