import { verifyUser } from "./../middleware/verifyUser";
import express, { Request, Response, Router } from "express";

import {
  Register,
  Login,
  adminLogin,
  getingUser,
  checkUserExist,
} from "../Controller/UserController";

const router = Router();

router.post("/register", Register);
router.post("/login", Login);
router.post("/adminlogin", adminLogin);
router.post("/gettinguser", verifyUser, getingUser);
router.post("/checkemail", checkUserExist);

export default router;
