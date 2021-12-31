"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.morganHandler = void 0;
const morgan_1 = __importDefault(require("morgan"));
const morganHandler = (_req, _res, next) => {
    morgan_1.default.token("body", (req) => JSON.stringify(req.body));
    next();
};
exports.morganHandler = morganHandler;
