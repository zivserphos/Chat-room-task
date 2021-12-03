const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { EventEmitter } = require("events");
const morgan = require("morgan");
const morganHandler = require("./middlewares/morgan");
const errorHandler = require("./middlewares/errorHandlers");
const path = require("path");
const {
  postComment,
  chatStream,
  onlineUser,
} = require("./controllers/chatRoom");
const app = express();

app.use(express.json());
app.use(cors());
app.use(
  morganHandler,
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.use(express.static(path.resolve("../client/build/")));

app.get("/", (req, res) => {
  res.sendFile(path.resolve("../client/build/index.html"));
});

app.get("/chatStream", chatStream);

app.post("/postComment", postComment);

app.post("/addOnlineUser", onlineUser);

module.exports = app;
