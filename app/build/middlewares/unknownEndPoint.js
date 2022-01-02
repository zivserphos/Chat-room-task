"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unknownEndPoint = void 0;
const unknownEndPoint = (_req, res, next) => {
    res.status(404).json({ error: "Unknown endpoint" });
    next();
};
exports.unknownEndPoint = unknownEndPoint;
