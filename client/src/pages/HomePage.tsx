/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
import React, { useRef } from "react";
import timeMessageSent from "./utils/utils";
import Message from "../core/Message";
import { Comment } from "../types";
import SelfMessage from "../core/SelfMessage";
import OnlineUsers from "../core/OnlineUsers";
import useSocket from "../customHooks/Socket";

const HomePage = function () {
  const inputEl = useRef<HTMLInputElement>(null);
  const { comments, setComments, users, setUsers, socketRef, userName } =
    useSocket();

  async function postComment() {
    if (!inputEl.current?.value) return;
    const newComment = {
      timeSent: timeMessageSent(),
      content: inputEl.current?.value,
      userName,
    };
    console.log(newComment);
    socketRef.current?.emit("postComment", newComment);
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
