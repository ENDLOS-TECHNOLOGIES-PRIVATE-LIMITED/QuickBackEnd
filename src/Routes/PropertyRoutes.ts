import { Router } from "express";
import { verifyUser } from "../middleware/verifyUser";

import { Edit, Get, Register } from "../Controller/PropetyConrtroller";

const router = Router();

router.post("/register", verifyUser, Register);
router.post("/edit", verifyUser, Edit);
router.post("/get", verifyUser, Get);

export default router;
