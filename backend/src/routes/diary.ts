import { Router } from "express";
import { getDiaries, createDiaryHandler, updateDiaryHandler, deleteDiaryHandler } from "../controllers/diary.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

// All diary routes require login
router.use(authMiddleware);

router.get("/", getDiaries);
router.post("/", createDiaryHandler);
router.put("/:id", updateDiaryHandler);
router.delete("/:id", deleteDiaryHandler);

export default router;
