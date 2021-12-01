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

app.get("/kaka", (req, res) => {
  res.status(200).set({
    connection: "keep-alive",
    "content-type": "text/event-stream",
  });
  setInterval(() => {
    res.write(`data: Hello there \n\n`);
  }, 4000);
});
module.exports = app;
