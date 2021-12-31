import React from "react";
import { Comment } from "../types";

const SelfMessage = function ({ comment }: { comment: Comment }) {
  const { userName, content, timeSent, target } = comment;
  const directMsg = target ? "block" : "none";

  return (
    <div className="container-message">
      <div className="message-blue">
        <p className="message-content">
          <b>{`${userName}`}</b>:{content}
        </p>
        <div className="message-timestamp-left">
          <span>
            SMS
            {timeSent}
          </span>
          <span style={{ color: "red", display: directMsg }}>
            Me to {target}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SelfMessage;
