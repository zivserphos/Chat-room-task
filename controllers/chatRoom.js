const Comments = require("../models/comment");
const Users = require("../models/users");
const OnlineUsers = require("../models/onlineUsers");
const { EventEmitter } = require("events");
const emitter = new EventEmitter();
const bcrypt = require("bcrypt");
const onlineUsers = require("../models/onlineUsers");

let index = 0;

exports.chatStream = async (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    Connection: "Keep-Alive",
  });
  const comments = await Comments.find({});
  res.write(`data: ${JSON.stringify({ comments })} \n\n`);
  emitter.on("comment", (comments) => {
    res.write(`data: ${JSON.stringify({ comments })} \n\n`);
  });
  emitter.on("users", (users) => {
    res.write(`data: ${JSON.stringify({ users })} \n\n`);
  });
};

exports.postComment = async (req, res, next) => {
  const { content, userName, timeSent } = req.body;
  const user = await Users.findOne({ userName: userName });
  if (!user) Users.insertMany({ userName });
  try {
    const comment = { userName, content: content, timeSent };
    await Comments.insertMany(comment);
    const comments = await Comments.find({});
    emitter.emit("comment", comments);
  } catch (err) {
    next({ status: 400, message: { error: "could not post comment" } });
  }
  res.send("comment has been posted");
};

exports.onlineUser = async (req, res) => {
  const { user } = req.body;
  const isLogin = OnlineUsers.find({ user });
  isLogin
    ? await OnlineUsers.insertMany({ user: user })
    : res.status(409).send("User already logged in");
  res.status(200).send("User is now online to chat");
};

exports.oflineUser = async (req, res) => {
  const { user } = req.body;
  const isLogin = OnlineUsers.find({ user });
  isLogin
    ? res.status(409).send("User is not online to this moment")
    : await OnlineUsers.deleteOne({ user: user });
  res.status(200).send("User is now online to chat");
};
