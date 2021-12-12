import { Handler, Response } from "express";

export const unknownEndPoint: Handler = (_req, res: Response, next) => {
  res.status(404).json({ error: "Unknown endpoint" });
  next();
};
