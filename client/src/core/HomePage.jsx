import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function HomePage() {
  const [comments, setComments] = useState([]);
  const location = useLocation();
  const inputEl = useRef();
  const userName = location.state.user;

  useEffect(() => {
    const source = new EventSource("http://localhost:3001/chatStream", {
      headers: { "Content-Type": "text/event-stream" },
    });

    source.onopen = function () {
      console.log("connection to stream has been opened");
    };
    source.onerror = function (error) {
      console.log("An error has occurred while receiving stream", error);
    };
    source.onmessage = function (event) {
      const comment = JSON.parse(event.data);
      const newComments = [...comments];
      newComments.push(comment);
      // const newComments = JSON.parse(event.data).comments;
      console.log(newComments);
      if (!newComments) return;
      setComments(newComments);
    };
  }, []);

  async function postComment() {
    if (!inputEl.current.value) return;
    try {
      await axios.post(
        "http://localhost:3001/postComment",
        { content: inputEl.current.value, userName: userName },
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
      <div className="wrapper">
        <div className="main-container">
          <div className="message-area">
            {comments.map((comment) => (
              <div>{comment.content}</div>
            ))}
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
                onClick={(e) => {
                  e.preventDefault();
                  postComment();
                }}
              ></input>
            </form>
          </div>
        </div>
        <div className="online-tab">
          <div className="status-bar-user">
            <p>
              <span>• </span>Online
            </p>
          </div>
          <div className="online-user-list">
            <div className="online-tab-open">&#9776;</div>
          </div>
        </div>
      </div>
    </div>
  );
}
