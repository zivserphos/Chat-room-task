import Comments from "../db/models/comment";
import Users from "../db/models/users";
import OnlineUsers from "../db/models/onlineUsers";
import { EventEmitter } from "events";
import { Request, Response, NextFunction } from "express";
import { io } from "../index";
import { Socket } from "socket.io";
const emitter = new EventEmitter();

// export const chatStream = async (req: Request, res: Response) => {
//   // chatController();
//   const { userName } = req.query;
//   res.writeHead(200, {
//     "Content-Type": "text/event-stream",
//     Connection: "Keep-Alive",
//   });
//   const newComments = await Comments.find({});
//   res.write(`data: ${JSON.stringify({ newComments })} \n\n`);
//   emitter.on("comment", (newComments) => {
//     res.write(`data: ${JSON.stringify({ newComments })} \n\n`);
//   });
//   emitter.on("onlineUsers", (users) => {
//     res.write(`data: ${JSON.stringify({ users })} \n\n`);
//   });
//   req.on("close", async () => {
//     try {
//       await OnlineUsers.findOneAndDelete({ userName });
//       emitter.emit("onlineUsers");
//     } catch (err) {}
//   });
// };

export const chatController = async (socket: Socket) => {
  console.log("connected to Socket");
  socket.on("doSome", (email: string) => {
    console.log(email);

    io.emit("onlines", { a: "123" });
  });
};

// export const postComment = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   io.emit("onlines", { a: "zibi" });
//   const { content, userName, timeSent } = req.body;
//   const user = await Users.findOne({ userName: userName });
//   if (!user) Users.insertMany({ userName });
//   try {
//     const comment = { userName, content: content, timeSent };
//     await Comments.insertMany(comment);
//     const comments = await Comments.find({});
//     emitter.emit("comment", comments);
//   } catch (err) {
//     next({ status: 400, message: { error: "could not post comment" } });
//   }
//   res.send("comment has been posted");
// };

// export const onlineUser = async (req: Request, res: Response) => {
//   const { userName } = req.params;
//   const isLogin = await OnlineUsers.findOne({ userName });
//   if (!isLogin) {
//     await OnlineUsers.insertMany({ userName });
//     res.status(200).send("User is now online to chat");
//   } else {
//     res.status(409).send("User already logged in");
//   }
//   const updatedOnlineUsers = await OnlineUsers.distinct("userName");
//   return emitter.emit("onlineUsers", updatedOnlineUsers);
// };
