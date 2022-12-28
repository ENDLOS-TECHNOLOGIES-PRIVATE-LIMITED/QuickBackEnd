"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyUser_1 = require("../middleware/verifyUser");
const fileuploadControler_1 = require("../Controller/fileuploadControler");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
// setting multer for storing uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // cb(null, path.join(__dirname, "../../../uploads/"));
        cb(null, path.join(__dirname, "../../uploads/"));
    },
    filename: (req, file, cb) => {
        cb(null, +new Date() + "-" + file.originalname);
    },
});
const upload = multer({ storage: storage });
const router = (0, express_1.Router)();
router.post("/register", upload.array("files", 8), fileuploadControler_1.Register);
router.post("/get", verifyUser_1.verifyUser, fileuploadControler_1.Get);
// router.get("/folder", express.static(path.join(__dirname, "uploads")));
// router.post("/edit", verifyUser, upload.array("files", 6), Edit);
exports.default = router;
