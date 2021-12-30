import app from "./app";
import "./db/mongo";
import { Server } from "socket.io";
import { createServer } from "http";
import { chatController } from "./controllers/chatRoom";
const http = createServer(app);
const PORT = process.env.PORT || 3001;

const io = new Server(http, { path: "/api/chatstream" });

http.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

io.on("connection", chatController);

export { io };
