const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

uniqueValidator.defaults.message = "";

const Users = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

Users.plugin(uniqueValidator);

module.exports = mongoose.model("Users", Users);
