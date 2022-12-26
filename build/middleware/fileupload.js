"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileUpload = void 0;
const fs = require("fs");
const path = require("path");
const multer = require("multer");
// setting multer for storing uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage: storage });
const fileUpload = (req, res, next) => {
    //   if (!token) {
    //     res.status(401).send({ error: "Login Please" });
    //   }
    //   try {
    //     const data: any = jwt.verify(token, JWT_SECRET);
    //     req.user = data.user;
    //     next();
    //   } catch (error) {
    //     res.status(401).send({ error: "Please authenticate using a valid token" });
    //   }
};
exports.fileUpload = fileUpload;
