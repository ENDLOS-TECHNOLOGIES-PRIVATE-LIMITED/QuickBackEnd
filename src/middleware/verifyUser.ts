import { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

export const verifyUser = (req: any, res: Response, next: NextFunction) => {
  // Get the user from the jwt token and add id to req object
  const token = req.header("authtoken");
  if (!token) {
    res.status(401).send({ error: "Login Please" });
  }
  try {
    const data: any = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    // console.log("data of user in verify ", data);
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};
