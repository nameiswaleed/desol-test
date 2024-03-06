const express = require("express");
const config = require("./config");
const db = require("./database");
const {authRouter,productsRouter} = require('./routes')
const port = config.port;
const cors = require("cors");

const morgan = require("morgan");

//initializing express app
const app = express();
// initialize middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(morgan('dev'));
// main api route
app.get("/", (req, res) => {
  res.sendStatus(200);
});
app.use('/auth',authRouter)
app.use('/products',productsRouter)

app.listen(port, () =>
  console.log(`app is listenin on http://localhost:${port}/`)
);
