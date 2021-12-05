exports.homePage = (req, res) => {
  res.sendFile(path.resolve("../client/build/index.html"));
};
