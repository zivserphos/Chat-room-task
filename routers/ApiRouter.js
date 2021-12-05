const express = require("express");
const router = express.Router();

const {
  postComment,
  chatStream,
  onlineUser,
  offlineUser,
} = require("../controllers/chatRoom");

router.get("/chatStream", chatStream);

router.post("/postComment", postComment);

router.post("/addOnlineUser/:userName", onlineUser);

module.exports = router;
