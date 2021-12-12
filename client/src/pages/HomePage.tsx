/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
import React, { useRef, useState, useEffect } from "react";
// eslint-disable-next-line import/no-unresolved
import { useLocation } from "react-router-dom";
import axios from "axios";
import { EventSourceInitDict } from "eventsource";
import Message from "../core/Message";
import SelfMessage from "../core/SelfMessage";
import OnlineUsers from "../core/OnlineUsers";
import { Comment } from "../types";

const HomePage = function () {
  const [comments, setComments] = useState<Comment[]>([]);
  const [users, SetUsers] = useState<string[]>([]);
  const [source, setSource] = useState<EventSource>();
  const location = useLocation();
  const inputEl = useRef<HTMLInputElement>(null);
  const userName:string = location.state.user;
  const eventSourceHeaders: EventSourceInitDict = {
    headers: { "Content-Type": "text/event-stream" },
  };

  const Base_URL_PATH = "http://localhost:3001";

  useEffect(() => {
    setSource(
      new EventSource(
        `${Base_URL_PATH}/api/chatStream/?userName=${userName}`,
        eventSourceHeaders,
      ),
    );
  }, []);

  if (source) {
    source.onopen = async function () {
      // eslint-disable-next-line no-console
      console.log("connection to stream has been opened");
      await axios.post(`${Base_URL_PATH}/api/addOnlineUser/${userName}`);
    };
    source.onerror = function (error) {
      // eslint-disable-next-line no-console
      console.log("An error has occurred while receiving stream", error);
    };
    source.onmessage = function (event) {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const { users } = JSON.parse(event.data);
      let { newComments } = JSON.parse(event.data);

      if (users) SetUsers(users);
      if (newComments) {
        newComments = newComments.reverse();
        setComments(newComments);
      }
    };
  }

  async function postComment() {
    if (!inputEl.current?.value) return;
    const hours = new Date().getHours().toString();
    let minutes = new Date().getMinutes().toString();
    if (minutes.length === 1) minutes = `0${minutes}`;
    const timeSent = `${hours}:${minutes}`;
    try {
      await axios.post(
        `${Base_URL_PATH}/api/postComment`,
        { content: inputEl.current.value, userName, timeSent },
        {
          headers: {
            "content-Type": "application/json",
          },
        },
      );
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
                : comments.map((comment) => (comment.userName === userName ? (
                  <SelfMessage comment={comment} key={comment._id} />
                ) : (
                  <Message comment={comment} key={comment._id} />
                )))}
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
