"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUser = void 0;
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const verifyUser = (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    const token = req.header("authtoken");
    if (!token) {
        res.status(401).send({ error: "Login Please" });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        // console.log("data of user in verify ", data);
        next();
    }
    catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }
};
exports.verifyUser = verifyUser;
