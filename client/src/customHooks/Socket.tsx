/* eslint-disable camelcase */
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import io, { Socket } from "socket.io-client";
import { Comment } from "../types";

const useSocket = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [users, setUsers] = useState<string[]>([]);
  const location = useLocation();
  const userName: string = location.state.user;
  const socketRef = useRef<Socket>();

  const Base_URL_PATH = "http://localhost:3001";

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

    socketRef.current.on("connectionOpened", ({ allComments, onlineUsers }) => {
      console.log(allComments);
      setComments(allComments);
      setUsers(onlineUsers);
    });

    socketRef.current.on("onlineUsers", (onlineUsers) => {
      console.log("im herezaza");
      setUsers(onlineUsers);
    });

    socketRef.current.on("commentPosted", (newComment: Comment) => {
      setComments((prevState: Comment[]) => [newComment, ...prevState]);
    });
    socketRef.current.on("connect_error", () => {
      socketRef.current?.disconnect();
    });

    socketRef.current.on("error", ({ err }) => {
      console.log(`an error occured: ${err}`);
    });
  }, []);

  return { comments, setComments, users, setUsers, socketRef, userName };
};

export default useSocket;
