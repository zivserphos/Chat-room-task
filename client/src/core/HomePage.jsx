import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SelfMessage, Message } from "./components/Message";
import OnlineUsers from "./components/OnlineUsers";
import axios from "axios";

const source = new EventSource("http://localhost:3001/chatStream", {
  headers: { "Content-Type": "text/event-stream" },
});

export default function HomePage() {
  const [comments, setComments] = useState([]);
  const [users, SetUsers] = useState([]);
  const location = useLocation();
  const inputEl = useRef();
  const userName = location.state.user;

  useEffect(() => {
    source.onopen = function () {
      console.log("connection to stream has been opened");
    };
    source.onerror = function (error) {
      console.log("An error has occurred while receiving stream", error);
    };
    source.onmessage = function (event) {
      let newComments = JSON.parse(event.data).comments;
      newComments = newComments.reverse();
      const users = JSON.parse(event.data).users;
      if (users) SetUsers(users);
      setComments(newComments);
    };
  }, []);

  async function postComment() {
    if (!inputEl.current.value) return;
    const hours = new Date().getHours().toString();
    let minutes = new Date().getMinutes().toString();
    if (minutes.length === 1) minutes = `0${minutes}`;
    const timeSent = `${hours}:${minutes}`;
    try {
      await axios.post(
        "http://localhost:3001/postComment",
        { content: inputEl.current.value, userName: userName, timeSent },
        {
          headers: {
            "content-Type": "application/json",
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div id="homePage">
      <div className="welcome-banner">
        <div className="name-side">
          <p>Welcome, {userName}</p>
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
                      <SelfMessage comment={comment} />
                    ) : (
                      <Message comment={comment} />
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
                ></input>
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
                ></input>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
