const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const morganHandler = require("./middlewares/morgan");
const path = require("path");
const ApiRouter = require("./routers/ApiRouter");
const { errorHandler } = require("./middlewares/errorHandlers");
const { unknownEndPoint } = require("./middlewares/unknownEndPoint");
const { homePage } = require("./controllers/staticFiles");

app.use(express.json());
app.use(cors());
app.use(
  morganHandler,
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
app.use(express.static(path.resolve("../client/build/")));

app.get("/login", homePage);

app.use("/api", ApiRouter);

app.use(errorHandler);
app.use(unknownEndPoint);

module.exports = app;
