import app from "./app";
import { createServer } from "http";
import "./db/mongo";
import { Server } from "socket.io";
import { chatStream, postComment, onlineUser } from "./controllers/chatRoom";
const http = createServer(app);
const PORT = process.env.PORT || 3001;

const io = new Server(http, { path: "/api/chatstream" });

io.on("connection", async (socket) => {
  const user = socket.handshake.query.userName;
  const allComments = await chatStream();
  const onlineUsers = await onlineUser(user as string);
  console.log(onlineUsers);
  io.emit("onlineUsers", onlineUsers);
  socket.emit("connectionOpened", { allComments });
  socket.on("newMessage", async ({ content, userName, timeSent }) => {
    const newComment = await postComment(content, userName, timeSent);
    io.emit("response", newComment);
  });
  console.log(socket.id);
  console.log("a user connected");
});

http.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
