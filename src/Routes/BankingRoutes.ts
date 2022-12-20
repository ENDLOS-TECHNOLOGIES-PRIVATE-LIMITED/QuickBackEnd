import { Router } from "express";
import { verifyUser } from "../middleware/verifyUser";

import { Edit, Get, Register } from "../Controller/BankingController";

const router = Router();

router.post("/register", verifyUser, Register);
router.post("/get", verifyUser, Get);

router.post("/edit", verifyUser, Edit);

export default router;
