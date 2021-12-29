import Comments from "../db/models/comment";
import Users from "../db/models/users";
import OnlineUsers from "../db/models/onlineUsers";
import { EventEmitter } from "events";
import { Request, Response, NextFunction } from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import app from "../app";

const http = createServer(app);
const io = new Server(http);

const emitter = new EventEmitter();

export const chatStream = async () => {
  const newComments = await Comments.find({});
  return newComments;
};

export const postComment = async (
  content: string,
  userName: string,
  timeSent: string
) => {
  console.log(content, userName, timeSent);
  console.log(userName);
  const user = await Users.findOne({ userName: userName });
  if (!user) await Users.insertMany({ userName });
  const comment = { userName, content: content, timeSent };
  await Comments.insertMany(comment);
  return comment;
};

export const onlineUser = async (user: string) => {
  const isLogin = await OnlineUsers.findOne({ userName: user });
  if (!isLogin) {
    await OnlineUsers.insertMany({ userName: user });
  }
  const updatedOnlineUsers = await OnlineUsers.distinct("userName");
  return updatedOnlineUsers;
};
