import React from "react";

const OnlineUsers = function ({ users }: {users: string[]}) {
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
          <div className="onlineUser" key={user}>
            {user}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnlineUsers;
