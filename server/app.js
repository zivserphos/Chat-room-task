const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const morgan = require("morgan");
const morganHandler = require("./middlewares/morgan");
const errorHandler = require("./middlewares/errorHandlers");
const app = express();

const comments = [];

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
  let index = 0;
  setInterval(() => {
    if (comments.length > index) {
      const data = "hello ziv";
      res.write(`data: ${data} \n\n\ `);
      index += 1;
    }
  }, 4000);
});

app.post("/AniGever", (req, res) => {
  console.log("gggg");
  comments.push("ziv hoo gever");
  return res.send("yes you are gever");
});

app.get("/", (req, res) => {
  console.log("shit");
});
module.exports = app;
