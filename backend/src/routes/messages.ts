import { Router } from "express";
import { getTestMessages, createTestMessage } from "../controllers/testMessage.controller";

const router = Router();

router.get("/", getTestMessages);
router.post("/", createTestMessage);

export default router;