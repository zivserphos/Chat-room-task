/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
import React, { useRef, useState } from "react";
import timeMessageSent from "./utils/utils";
import Message from "../core/Message";
import SelfMessage from "../core/SelfMessage";
import OnlineUsers from "../core/OnlineUsers";
import useSocket from "../customHooks/Socket";

const HomePage = function () {
  const [privateMsg, setPrivateMsg] = useState<string>();
  const inputEl = useRef<HTMLInputElement>(null);
  const { comments, users, socketRef, userName } = useSocket();

  async function postComment() {
    if (!inputEl.current?.value) return;
    const newComment = {
      timeSent: timeMessageSent(),
      content: inputEl.current?.value,
      userName,
    };
    !privateMsg
      ? socketRef.current?.emit("postComment", newComment)
      : socketRef.current?.emit("privateComment", {
          newComment,
          userName: privateMsg,
        });
    inputEl.current.value = "";
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
        <OnlineUsers users={users} setPrivateMsg={setPrivateMsg} />
        <div className="wrapper">
          <div className="main-container">
            <div className="message-area">
              {!comments
                ? ""
                : comments.map((comment) =>
                    comment.userName === userName ? (
                      <SelfMessage comment={comment} key={comment.id} />
                    ) : (
                      <Message comment={comment} key={comment.id} />
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
