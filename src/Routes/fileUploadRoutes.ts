import express, { Router } from "express";
import { verifyUser } from "../middleware/verifyUser";

import { Get, Register } from "../Controller/fileuploadControler";
const fs = require("fs");
const path = require("path");
const multer = require("multer");

// setting multer for storing uploaded files

const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    // cb(null, path.join(__dirname, "../../../uploads/"));
    cb(null, path.join(__dirname, "../../uploads/"));
  },

  filename: (req: any, file: any, cb: any) => {
    cb(null, +new Date() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const router = Router();

router.post("/register", upload.array("files", 8), Register);

router.post("/get", verifyUser, Get);

// router.get("/folder", express.static(path.join(__dirname, "uploads")));

// router.post("/edit", verifyUser, upload.array("files", 6), Edit);

export default router;
