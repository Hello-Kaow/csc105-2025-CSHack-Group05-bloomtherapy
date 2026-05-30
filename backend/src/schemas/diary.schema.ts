import {z} from "zod";

// Schema for creating a new diary
export const createDiarySchema = z.object({
    title: z
        .string()
        .min(1, "Title is required")
        .max(50, "Title must be at most 50 characters"),
    story: z
        .string()
        .min(1, "Diary content is required"),
    date: z
        .string()
        .min(1, "Date is required")
        .refine((val) => !isNaN(Date.parse(val)), "Invalid date format"),
});

// Schema for updating an existing diary
export const updateDiarySchema = z.object({
    title: z
        .string()
        .min(1, "Title is required")
        .max(50, "Title must be at most 50 characters")
        .optional(),
    story: z
        .string()
        .min(1, "Diary content is required"),
    date: z
        .string()
        .min(1, "Date is required")
        .refine((val) => !isNaN(Date.parse(val)), "Invalid date format"),
});