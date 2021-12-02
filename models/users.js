const mongoose = require("mongoose");

const Users = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("Users", Users);
