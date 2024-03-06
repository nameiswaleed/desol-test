const express = require("express");
const productsRouter = express.Router();

productsRouter.get("/", (req, res) => {
  res.sendStatus(200);
});

module.exports = productsRouter;
