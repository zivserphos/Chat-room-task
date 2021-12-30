/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
import React, { useRef, useState, useEffect } from "react";
// eslint-disable-next-line import/no-unresolved
import io, { Socket } from "socket.io-client";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Message from "../core/Message";
import SelfMessage from "../core/SelfMessage";
import OnlineUsers from "../core/OnlineUsers";
import { Comment } from "../types";

const HomePage = function () {
  const [comments, setComments] = useState<Comment[]>([]);
  const [users, setUsers] = useState<string[]>([]);
  const location = useLocation();
  const inputEl = useRef<HTMLInputElement>(null);
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

  async function postComment() {
    // socketRef.current?.emit("doSome", email);
    if (!inputEl.current?.value) return;
    const hours = new Date().getHours().toString();
    let minutes = new Date().getMinutes().toString();
    if (minutes.length === 1) minutes = `0${minutes}`;
    const timeSent = `${hours}:${minutes}`;
    socketRef.current?.emit("doSome", {
      content: inputEl.current.value,
      userName,
      timeSent,
    });
    try {
      // await axios.post(
      //   `${Base_URL_PATH}/api/postComment`,
      //   { content: inputEl.current.value, userName, timeSent },
      //   {
      //     headers: {
      //       "content-Type": "application/json",
      //     },
      //   }
      // );
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }

  return (
    <div id="homePage">
      <div className="welcome-banner">
        <div className="name-side">
          <p>
            Welcome,
            {userName}
          </p>
        </div>
      </div>
      <div className="chat">
        <OnlineUsers users={users} />
        <div className="wrapper">
          <div className="main-container">
            <div className="message-area">
              {!comments
                ? ""
                : comments.map((comment) =>
                    comment.userName === userName ? (
                      <SelfMessage comment={comment} key={comment._id} />
                    ) : (
                      <Message comment={comment} key={comment._id} />
                    )
                  )}
            </div>
            <div className="enter-area">
              <form>
                <input
                  type="text"
                  placeholder="Enter Message..."
                  name="message-ent"
                  id="message-ent"
                  ref={inputEl}
                />
                <input
                  className="submitComment"
                  type="submit"
                  name="message-send"
                  id="message-send"
                  value="Send"
                  onClick={async (e) => {
                    e.preventDefault();
                    postComment();
                  }}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
