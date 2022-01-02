"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onlineNamesList = exports.initialConnect = void 0;
const dbs_1 = require("../db/dbs");
const initialConnect = (userName, socket) => {
    const isOnline = dbs_1.ONLINE_USERS.find((user) => user.userName === userName);
    if (!isOnline)
        dbs_1.ONLINE_USERS.push({ socketId: socket.id, userName });
};
exports.initialConnect = initialConnect;
const onlineNamesList = () => dbs_1.ONLINE_USERS.map((onlineUser) => onlineUser.userName);
exports.onlineNamesList = onlineNamesList;
