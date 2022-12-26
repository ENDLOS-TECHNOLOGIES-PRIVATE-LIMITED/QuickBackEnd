"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyUser_1 = require("../middleware/verifyUser");
const uploadDocumentController_1 = require("../Controller/uploadDocumentController");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
// setting multer for storing uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../uploads/"));
    },
    // filename: (req: any, file: any, cb: any) => {
    //   cb(null, file.originalname );
    // },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + Math.random() + "-" + file.originalname);
    },
});
const upload = multer({ storage: storage });
const router = (0, express_1.Router)();
router.post("/register", verifyUser_1.verifyUser, upload.array("files", 6), uploadDocumentController_1.Register);
router.post("/get", verifyUser_1.verifyUser, uploadDocumentController_1.Get);
// router.post("/edit", verifyUser, upload.array("files", 6), Edit);
exports.default = router;
