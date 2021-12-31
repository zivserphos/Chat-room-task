"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const app_1 = __importDefault(require("./app"));
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const chatRoom_1 = require("./controllers/chatRoom");
const http = (0, http_1.createServer)(app_1.default);
const PORT = process.env.PORT || 3001;
const io = new socket_io_1.Server(http, { path: "/api/chatstream" });
exports.io = io;
http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
io.on("connection", chatRoom_1.chatController);
