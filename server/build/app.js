"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const morgan_2 = require("./middlewares/morgan");
const path_1 = __importDefault(require("path"));
const ApiRouter_1 = __importDefault(require("./routers/ApiRouter"));
const errorHandlers_1 = require("./middlewares/errorHandlers");
const unknownEndPoint_1 = require("./middlewares/unknownEndPoint");
const staticFiles_1 = require("./controllers/staticFiles");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(
  morgan_2.morganHandler,
  (0, morgan_1.default)(
    ":method :url :status :res[content-length] - :response-time ms :body"
  )
);
app.use(express_1.default.static(path_1.default.resolve("../client/build/")));
app.get("/login", staticFiles_1.homePage);
app.use("/api", ApiRouter_1.default);
app.use(errorHandlers_1.errorHandler);
app.use(unknownEndPoint_1.unknownEndPoint);
exports.default = app;
