const mongoose = require("mongoose");

const Comments = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timeSent: {
    type: String,
  },
});

module.exports = mongoose.model("Comments", Comments);
