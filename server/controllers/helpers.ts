import { Socket } from "socket.io";
import { ONLINE_USERS, COMMENTS, USERS } from "../db/dbs";

export const initialConnect = (userName: string, socket: Socket): void => {
  const isOnline = ONLINE_USERS.find((user) => user.userName === userName);
  if (!isOnline) ONLINE_USERS.push({ socketId: socket.id, userName });
};

export const onlineNamesList = () =>
  ONLINE_USERS.map((onlineUser) => onlineUser.userName);
