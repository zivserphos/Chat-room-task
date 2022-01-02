import express from "express";
import cors from "cors";
import morgan from "morgan";
import { morganHandler } from "./middlewares/morgan";
import path from "path";
import ApiRouter from "./routers/ApiRouter";
import { errorHandler } from "./middlewares/errorHandlers";
import { unknownEndPoint } from "./middlewares/unknownEndPoint";
import { homePage } from "./controllers/staticFiles";

const app = express();

app.use(express.json());
app.use(cors());
app.use(
  morganHandler,
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
app.use(express.static(path.resolve("./GGGG")));

app.get("/login", homePage);

app.use("/api", ApiRouter);

app.use(errorHandler);
app.use(unknownEndPoint);

export default app;
