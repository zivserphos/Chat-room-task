import React from "react";

export default function OnlineUsers() {
  return (
    <div className="online-tab">
      <div className="status-bar-user">
        <p>
          <span>• </span>Online
        </p>
      </div>
      <div className="online-user-list">
        <div className="online-tab-closed">&#9776;</div>
      </div>
    </div>
  );
}
