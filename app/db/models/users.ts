import mongoose from "mongoose";

const Users = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Users", Users);
