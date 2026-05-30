import { Response } from "express";
import { updateQuoteSchema } from "../schemas/quote.schema.js";
import { getQuoteByUser, upsertQuote } from "../models/quote.model.js";
import type { AuthRequest } from "../middleware/auth.middleware.js";

// GET /quote — get logged-in user's quote
export const getQuote = async (req: AuthRequest, res: Response) => {
    const text = await getQuoteByUser(req.userId!);
    res.json({ text });
};

// PUT /quote — update logged-in user's quote
export const updateQuote = async (req: AuthRequest, res: Response) => {
    const parsed = updateQuoteSchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({ message: "Validation failed", errors: parsed.error.flatten().fieldErrors });
        return;
    }
    const text = await upsertQuote(req.userId!, parsed.data.text);
    res.json({ text });
};
