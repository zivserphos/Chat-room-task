const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const morgan = require("morgan");
const morganHandler = require("./middlewares/morgan");
const errorHandler = require("./middlewares/errorHandlers");
const app = express();

app.use(express.json());
app.use(cors());
app.use(
  morganHandler,
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.get("/", (req, res) => {
  res.send("fuck off");
});
app.use(errorHandler);
module.exports = app;
