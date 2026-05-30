import { z } from "zod";

export const updateQuoteSchema = z.object({
    text: z.string().min(1, "Quote text is required").max(100, "Quote must be at most 100 characters"),
});
