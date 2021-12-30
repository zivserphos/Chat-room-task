import React, { useEffect, useRef } from "react";
import io, { Socket } from "socket.io-client";

const Base_URL_PATH = "http://localhost:3001";

const useSocket = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const socketRef = useRef<Socket>();

  useEffect(() => {
    socketRef.current = io(`${Base_URL_PATH}`, {
      path: "/api/chatstream",
      reconnectionDelayMax: 10000,
      auth: {
        token: "123",
      },
      query: {
        "my-key": "my-value",
        userName,
      },
    });

    socketRef.current.on("onlineUsers", (onlineUsers) => {
      setUsers(onlineUsers);
    });

    socketRef.current.on("connectionOpened", ({ allComments }) => {
      console.log(allComments);
      setComments(allComments);
    });
    socketRef.current.on("response", (newComment: Comment) => {
      setComments((prevState: Comment[]) => [...prevState, newComment]);
    });
    socketRef.current.on("connect_error", () => {
      socketRef.current?.disconnect();
    });

    socketRef.current.on("onlines", ({ a }) => {
      console.log(a);
    });

    socketRef.current.on("error", (err) => {
      console.log(`an error occured: ${err}`);
    });
  }, []);
};
