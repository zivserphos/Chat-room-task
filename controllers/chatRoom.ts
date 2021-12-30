import Comments from "../db/models/comment";
import Users from "../db/models/users";
import OnlineUsers from "../db/models/onlineUsers";
import { EventEmitter } from "events";
import { io } from "../index";
import { Socket } from "socket.io";

export const chatController = async (socket: Socket) => {
  console.log("connection");
  const { userName } = socket.handshake.query;
  const allComments = (await Comments.find({})).reverse();
  const onlineUsers = (await OnlineUsers.find({})).map((user) => user.userName);

  socket.emit("connectionOpened", { allComments, onlineUsers });

  socket.on("connect_error", () => {
    console.log("disconnect");
  });

  socket.on("postComment", async (newComment) => {
    console.log(newComment);
    try {
      const res = await Comments.insertMany(newComment);
      io.emit("commentPosted", res[0]);
    } catch (err) {
      io.emit("error", { err: "could not post comment" });
    }
  });
  socket.on("onlineUsers", async (userName) => {
    const isOnline = await OnlineUsers.findOne({ userName });
    if (!isOnline) {
      const a = await OnlineUsers.insertMany({ userName });
      io.emit("onlineUsers", userName);
      console.log(a);
    }
  });
};
