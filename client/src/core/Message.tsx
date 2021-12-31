import React from "react";
import { Comment } from "../types";

const Message = function ({ comment }: { comment: Comment }) {
  const { userName, content, timeSent, privateMsg } = comment;
  const directMsg = privateMsg ? "block" : "none";

  return (
    <div className="container-message">
      <div className="message-orange">
        <p className="message-content">
          <b>{`${userName}`}</b>:{content}
        </p>
        <div className="message-timestamp-left">
          <span>
            SMS
            {timeSent}
          </span>
          <span style={{ color: "red", display: directMsg }}>
            Direct messgae!
          </span>
        </div>
      </div>
    </div>
  );
};

export default Message;
