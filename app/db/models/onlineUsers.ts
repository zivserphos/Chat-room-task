import mongoose from "mongoose";

const OnlineUsers = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.model("OnlineUsers", OnlineUsers);
