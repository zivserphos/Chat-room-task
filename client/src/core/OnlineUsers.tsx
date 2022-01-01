/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";

const OnlineUsers = function ({
  users,
  setPrivateMsg,
}: {
  users: string[];
  setPrivateMsg: (msg: string) => void;
}) {
  const [targetMsg, setTargetMsg] = useState<string>("everyone");
  const handlePrivateMsg = (target: HTMLDivElement, user: string) => {
    setTargetMsg(user);
    setPrivateMsg(user);
  };
  const sendToAll = () => {
    setTargetMsg("everyone");
    setPrivateMsg("");
  };

  return (
    <div className="online-tab">
      <div className="status-bar-user">
        <p>
          <span>•</span>
          Online
        </p>
      </div>
      <div className="online-user-list">
        <div
          role="button"
          className="aside__user online-circle"
          style={{
            backgroundColor: targetMsg === "everyone" ? "#44db8b" : "gainsboro",
          }}
          key="everyone"
          onClick={sendToAll}
        >
          <span>Every One</span>
        </div>
        {users.map((user) => (
          <div
            role="button"
            className="aside__user online-circle"
            style={{
              backgroundColor: targetMsg === user ? "#44db8b" : "gainsboro",
            }}
            key={user}
            onClick={(e) => handlePrivateMsg(e.target as HTMLDivElement, user)}
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
