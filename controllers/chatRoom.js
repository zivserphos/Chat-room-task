const Comments = require("../models/comment");
const Users = require("../models/users");
const { EventEmitter } = require("events");
const emitter = new EventEmitter();
const bcrypt = require("bcrypt");

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

exports.addUser = async (req, res) => {
  const { User } = req.body;
  await Users.insertMany(user);
};
