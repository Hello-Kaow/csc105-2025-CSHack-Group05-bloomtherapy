import { Router } from "express";
import { getQuote, updateQuote } from "../controllers/quote.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.use(authMiddleware);

router.get("/", getQuote);
router.put("/", updateQuote);

export default router;
