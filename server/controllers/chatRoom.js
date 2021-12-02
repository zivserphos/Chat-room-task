const Comments = require("../models/comment");
const Users = require("../models/users");
const { EventEmitter } = require("events");
const emitter = new EventEmitter();
const bcrypt = require("bcrypt");

exports.chatStream = async (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    Connection: "Keep-Alive",
  });
  const comments = ["!", "@", "%"];
  res.write(`data: ${JSON.stringify({ comments })} \n\n`);
  emitter.addListener("comment", (comment) => {
    console.log("im on emmit");
    res.write(`data: ${JSON.stringify({ comment })} \n\n`);
  });
};

exports.postComment = async (req, res, next) => {
  const { content, userName } = req.body;
  const user = await Users.findOne({ userName: userName });
  if (!user) Users.insertMany({ userName });
  try {
    const comment = { userName, content: content };
    await Comments.insertMany({ userName: userName, content: content });
    emitter.emit("comment", comment);
  } catch (err) {
    next({ status: 400, message: { error: "could not post comment" } });
  }
  res.send("comment has been posted");
};
