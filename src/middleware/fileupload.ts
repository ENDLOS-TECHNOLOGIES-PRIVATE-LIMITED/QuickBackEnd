const fs = require("fs");
const path = require("path");
const multer = require("multer");
import { Request, Response, NextFunction } from "express";
// setting multer for storing uploaded files

const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, "uploads");
  },
  filename: (req: any, file: any, cb: any) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

export const fileUpload = (req: any, res: Response, next: NextFunction) => {
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
