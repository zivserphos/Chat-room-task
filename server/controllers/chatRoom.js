const Comments = require("../db/models/comment");
const Users = require("../db/models/users");
const OnlineUsers = require("../db/models/onlineUsers");
const { EventEmitter } = require("events");
const emitter = new EventEmitter();

exports.chatStream = async (req, res) => {
  const { userName } = req.query;
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    Connection: "Keep-Alive",
  });
  const newComments = await Comments.find({});
  res.write(`data: ${JSON.stringify({ newComments })} \n\n`);
  emitter.on("comment", (newComments) => {
    res.write(`data: ${JSON.stringify({ newComments })} \n\n`);
  });
  emitter.on("onlineUsers", (users) => {
    res.write(`data: ${JSON.stringify({ users })} \n\n`);
  });
  req.on("close", async () => {
    try {
      console.log(userName);
      await OnlineUsers.findOneAndDelete({ userName });
      emitter.emit("onlineUsers");
    } catch (err) {
      console.log(err);
    }
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
  return emitter.emit("onlineUsers", updatedOnlineUsers);
};
