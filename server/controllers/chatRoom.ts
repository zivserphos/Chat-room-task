import { ONLINE_USERS, COMMENTS, USERS } from "../db/dbs";
import { nanoid } from "nanoid";
import { io } from "../index";
import { Socket } from "socket.io";
import { initialConnect, onlineNamesList } from "./helpers";

export const chatController = (socket: Socket) => {
  const { userName } = socket.handshake.query;
  initialConnect(userName as string, socket);

  socket.broadcast.emit("onlineUsers", {
    onlineUsers: onlineNamesList(),
  });

  socket.emit("connectionOpened", {
    allComments: COMMENTS,
    onlineUsers: onlineNamesList(),
  });

  socket.on("connect_error", () => {
    console.log("disconnect");
  });

  socket.on("postComment", (newComment: Comment) => {
    try {
      newComment.id = nanoid();
      COMMENTS.push({ ...newComment });
      io.emit("commentPosted", newComment);
    } catch (err) {
      io.emit("error", { err: "could not post comment" });
    }
  });

  socket.on("privateComment", ({ newComment, userName }) => {
    newComment.id = nanoid();
    const userSocket = ONLINE_USERS.find(
      (user) => user.userName === userName
    )?.socketId;
    if (!userSocket) return;
    newComment.privateMsg = true;
    newComment.target = userName;
    socket.emit("commentPosted", newComment);
    socket.broadcast.to(userSocket).emit("commentPosted", newComment);
  });

  socket.on("disconnect", () => {
    console.log("disconnect");
    const index = ONLINE_USERS.findIndex((user) => user.userName === userName);
    ONLINE_USERS.splice(index, 1);
    io.emit("onlineUsers", { onlineUsers: onlineNamesList() });
  });
};
