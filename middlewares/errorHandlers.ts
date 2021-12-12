import { ErrorRequestHandler } from "express";
interface HttpError {
  status: number;
  message: string;
}

export const errorHandler: ErrorRequestHandler = (
  err: HttpError | Error,
  _req,
  res,
  _next
) => {
  "status" in err
    ? res.status(err.status).send(err.message)
    : res.status(500).send("internal serverError");
};
