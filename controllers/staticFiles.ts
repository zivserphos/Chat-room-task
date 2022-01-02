import path from "path";
import { Request, Response } from "express";

export const homePage = (_req: Request, res: Response) => {
  res.sendFile(path.resolve("../client/build/index.html"));
};
