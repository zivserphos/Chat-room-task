const path = require("path");

exports.homePage = (req, res) => {
  res.sendFile(path.resolve("./index.html"));
};
