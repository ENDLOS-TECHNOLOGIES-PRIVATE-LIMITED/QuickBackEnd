import express, { Request, Response, Router } from "express";
import { verifyUser } from "../middleware/verifyUser";

import { Register, Edit, Get, All } from "../Controller/ApplicationController";

const router = Router();

router.post("/register", verifyUser, Register);
router.post("/edit", verifyUser, Edit);
router.post("/get", verifyUser, Get);
router.post("/all", verifyUser, All);

export default router;
