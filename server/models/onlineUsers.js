const mongoose = require("mongoose");

const OnlineUsers = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("OnlineUsers", OnlineUsers);
