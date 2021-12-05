import React from "react";

export default function OnlineUsers({ users }) {
  return (
    <div className="online-tab">
      <div className="status-bar-user">
        <p>
          <span>•</span>Online
        </p>
      </div>
      <div className="online-user-list">
        {users.map((user) => {
          return (
            <div className="onlineUser" key={user}>
              {user}
            </div>
          );
        })}
      </div>
    </div>
  );
}
