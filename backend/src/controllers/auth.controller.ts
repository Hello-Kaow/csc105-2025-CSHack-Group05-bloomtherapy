import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";
import { findUserByUsername, createUser } from "../models/user.model.js";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-here";
console.log("controller secret:", JWT_SECRET);
// POST /auth/register
export const register = async (req: Request, res: Response) => {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({ message: "Validation failed", errors: parsed.error.flatten().fieldErrors });
        return;
    }
    const { username, password } = parsed.data;

    const existing = await findUserByUsername(username);
    if (existing) {
        res.status(409).json({ message: "Username already exists" });
        return;
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await createUser(username, hashed);

    res.status(201).json({ id: user.id, username: user.username });
};

// POST /auth/login
export const login = async (req: Request, res: Response) => {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({ message: "Validation failed", errors: parsed.error.flatten().fieldErrors });
        return;
    }
    const { username, password } = parsed.data;

    const user = await findUserByUsername(username);
    if (!user) {
        res.status(401).json({ message: "Username or password is incorrect" });
        return;
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
        res.status(401).json({ message: "Username or password is incorrect" });
        return;
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });

    res.json({ token, user: { id: user.id, username: user.username } });
};