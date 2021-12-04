const Comments = require("../db/models/comment");
const Users = require("../db/models/users");
const OnlineUsers = require("../db/models/onlineUsers");
const { EventEmitter } = require("events");
const emitter = new EventEmitter();
const bcrypt = require("bcrypt");
const onlineUsers = require("../db/models/onlineUsers");
const path = require("path");

let index = 0;

exports.chatStream = async (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    Connection: "Keep-Alive",
  });
  const newComments = await Comments.find({});
  res.write(`data: ${JSON.stringify({ newComments })} \n\n`);
  emitter.on("comment", (newComments) => {
    res.write(`data: ${JSON.stringify({ newComments })} \n\n`);
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
  const { userName } = req.params;
  const isLogin = await OnlineUsers.findOne({ userName });
  if (!isLogin) {
    await OnlineUsers.insertMany({ userName });
    res.status(200).send("User is now online to chat");
  } else {
    res.status(409).send("User already logged in");
  }
  const updatedOnlineUsers = await OnlineUsers.distinct("userName");
  return emitter.emit("users", updatedOnlineUsers);
};

exports.offlineUser = async (req, res) => {
  const { userName } = req.params;
  const isLogin = await OnlineUsers.find({ userName });
  if (!isLogin) {
    res.status(409).send("User already logged in");
  } else {
    const isDeleted = await OnlineUsers.deleteOne({ userName });
    const updatedOnlineUsers = await OnlineUsers.find({});
    emitter.emit("users");
    res.status(200).send("User is now offline to chat");
  }
  const updatedOnlineUsers = await OnlineUsers.distinct("userName");
  return emitter.emit("users", updatedOnlineUsers);
};

exports.homePage = (req, res) => {
  res.sendFile(path.resolve("../client/build/index.html"));
};

// req.on('close', async () => {
//   try {
//     console.log(`${username} disconnected`);
//     await User.findOneAndDelete({ name: username });

//     em.emit('login/logout');
//   } catch (error) {
//     console.log(error);
//   }
// });
