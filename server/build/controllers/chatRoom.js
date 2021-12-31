"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatController = void 0;
const dbs_1 = require("../db/dbs");
const nanoid_1 = require("nanoid");
const index_1 = require("../index");
const helpers_1 = require("./helpers");
const chatController = (socket) => {
    const { userName } = socket.handshake.query;
    (0, helpers_1.initialConnect)(userName, socket);
    socket.broadcast.emit("onlineUsers", {
        onlineUsers: (0, helpers_1.onlineNamesList)(),
    });
    socket.emit("connectionOpened", {
        allComments: dbs_1.COMMENTS,
        onlineUsers: (0, helpers_1.onlineNamesList)(),
    });
    socket.on("connect_error", () => {
        console.log("disconnect");
    });
    socket.on("postComment", (newComment) => {
        try {
            newComment.id = (0, nanoid_1.nanoid)();
            dbs_1.COMMENTS.push(Object.assign({}, newComment));
            index_1.io.emit("commentPosted", newComment);
        }
        catch (err) {
            index_1.io.emit("error", { err: "could not post comment" });
        }
    });
    socket.on("privateComment", ({ newComment, userName }) => {
        var _a;
        newComment.id = (0, nanoid_1.nanoid)();
        const userSocket = (_a = dbs_1.ONLINE_USERS.find((user) => user.userName === userName)) === null || _a === void 0 ? void 0 : _a.socketId;
        if (!userSocket)
            return;
        newComment.privateMsg = true;
        newComment.target = userName;
        socket.emit("commentPosted", newComment);
        socket.broadcast.to(userSocket).emit("commentPosted", newComment);
    });
    socket.on("disconnect", () => {
        console.log("disconnect");
        const index = dbs_1.ONLINE_USERS.findIndex((user) => user.userName === userName);
        dbs_1.ONLINE_USERS.splice(index, 1);
        index_1.io.emit("onlineUsers", { onlineUsers: (0, helpers_1.onlineNamesList)() });
    });
};
exports.chatController = chatController;
