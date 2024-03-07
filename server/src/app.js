const express = require("express");
const config = require("./config");
const db = require("./database");
const { authRouter, carRouter } = require("./routes");
const port = config.port;
const cors = require("cors");
const bodyParser = require("body-parser");

const morgan = require("morgan");

//initializing express app
const app = express();
// initialize middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());
// main api route
app.get("/", (req, res) => {
  res.sendStatus(200);
});
app.use("/auth", authRouter);
app.use("/car", carRouter);

app.listen(port, () =>
  console.log(`app is listenin on http://localhost:${port}/`)
);
