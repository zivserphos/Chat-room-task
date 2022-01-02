"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, _req, res, _next) => {
    "status" in err
        ? res.status(err.status).send(err.message)
        : res.status(500).send("internal serverError");
};
exports.errorHandler = errorHandler;
