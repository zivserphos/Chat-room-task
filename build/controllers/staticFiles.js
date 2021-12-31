"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.homePage = void 0;
const path_1 = __importDefault(require("path"));
const homePage = (_req, res) => {
    res.sendFile(path_1.default.resolve("../client/build/index.html"));
};
exports.homePage = homePage;
