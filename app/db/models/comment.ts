import mongoose from "mongoose";

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

export default mongoose.model("Comments", Comments);
