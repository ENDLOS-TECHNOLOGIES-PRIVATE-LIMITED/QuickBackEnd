import { Router } from "express";

import { Register, Edit, Get } from "../Controller/ClientController";
import { verifyUser } from "../middleware/verifyUser";

const router = Router();

router.post("/register", verifyUser, Register);
router.post("/edit", verifyUser, Edit);
router.post("/get", verifyUser, Get);

export default router;
