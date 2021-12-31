/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";

const OnlineUsers = function ({
  users,
  setPrivateMsg,
}: {
  users: string[];
  setPrivateMsg: (msg: string) => void;
}) {
  return (
    <div className="online-tab">
      <div className="status-bar-user">
        <p>
          <span>•</span>
          Online
        </p>
      </div>
      <div className="online-user-list">
        {users.map((user) => (
          <div
            role="button"
            className="aside__user online-circle"
            key={user}
            onClick={() => setPrivateMsg(user)}
          >
            <span>{user}</span>
            <span>
              <FontAwesomeIcon icon={faComments} style={{ color: "green" }} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnlineUsers;
