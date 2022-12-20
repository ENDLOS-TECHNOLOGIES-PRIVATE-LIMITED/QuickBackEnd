import { verifyUser } from "./../middleware/verifyUser";
import express, { Request, Response, Router } from "express";

import {
  Register,
  Login,
  adminLogin,
  getingUser,
} from "../Controller/UserController";

const router = Router();

router.post("/register", Register);
router.post("/login", Login);
router.post("/adminlogin", verifyUser, adminLogin);
router.post("/gettinguser", verifyUser, getingUser);

export default router;
