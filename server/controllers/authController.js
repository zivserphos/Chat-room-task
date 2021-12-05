const Users = require("../db/models/users");
const { schema } = require("./helpers/passwordValidator");

exports.registerUser = async (req, res, next) => {
  const { userName, password, email } = req.body;
  try {
    await Users.insertMany({ userName, password, email });
    res.send("inserted succsefully");
  } catch (err) {
    if (err.message.includes("userName")) {
      next({ status: 409, message: "user already exist" });
    }
    if (err.message.includes("email")) {
      next({ status: 409, message: "email already exist" });
    }
    next({ status: 400, message: err.message });
  }
};
