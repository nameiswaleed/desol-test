const express = require("express");
const productsRouter = express.Router();
const { authMiddleware } = require("../middlewares");
const { createCar, getAllCars } = require("../controller/car.controller");
const multer = require("multer");
const { storage } = require("../services/storage.service");
const upload = multer({ storage });
const { uploader } = require("../services/multer.service");
// routes
productsRouter.post("/", authMiddleware, upload.array("pictures"), createCar);
productsRouter.get("/", authMiddleware, getAllCars);
//exporting routes
module.exports = productsRouter;
