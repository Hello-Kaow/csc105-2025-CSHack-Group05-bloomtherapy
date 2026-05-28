import { z } from "zod";

// Schema for register
export const registerSchema = z.object({
    username: z
        .string()
        .min(3, "Username must be at least 3 characters")
        .max(20, "Username must be at most 20 characters"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter")
        .regex(/[0-9]/, "Password must contain at least 1 number")
        .regex(/[^A-Za-z0-9]/, "Password must contain at least 1 special character"),
});

// Schema for login (no length checks, just non-empty)
export const loginSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required"),
});