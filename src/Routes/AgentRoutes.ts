import { Router } from "express";
import { verifyUser } from "../middleware/verifyUser";
import { Register, Get, Edit } from "../Controller/AgentController";

const router = Router();

router.post("/register", verifyUser, Register);
router.post("/edit", verifyUser, Edit);
router.post("/get", verifyUser, Get);

export default router;
