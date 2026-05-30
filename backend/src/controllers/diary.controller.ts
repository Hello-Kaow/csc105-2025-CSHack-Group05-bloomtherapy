import { Response } from "express";
import { createDiarySchema, updateDiarySchema } from "../schemas/diary.schema.js";
import { findDiaryByUser, createDiary, updateDiary, deleteDiary } from "../models/diary.model.js";
import type { AuthRequest } from "../middleware/auth.middleware.js";

// GET /diary — get all diaries of logged-in user
export const getDiaries = async (req: AuthRequest, res: Response) => {
    const diaries = await findDiaryByUser(req.userId!);
    res.json(diaries);
};

// POST /diary — create a new diary
export const createDiaryHandler = async (req: AuthRequest, res: Response) => {
    const parsed = createDiarySchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({ message: "Validation failed", errors: parsed.error.flatten().fieldErrors });
        return;
    }

    const { title, story, date } = parsed.data;
    const diary = await createDiary(title, story, new Date(date), req.userId!);
    res.status(201).json(diary);
};

// PUT /diary/:id — update a diary
export const updateDiaryHandler = async (req: AuthRequest, res: Response) => {
    const parsed = updateDiarySchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({ message: "Validation failed", errors: parsed.error.flatten().fieldErrors });
        return;
    }

    const id = req.params.id as string;
    const updates: { title?: string; story?: string; date?: Date } = {
        ...(parsed.data.title && { title: parsed.data.title }),
        ...(parsed.data.story && { story: parsed.data.story }),
        ...(parsed.data.date && { date: new Date(parsed.data.date) }),
    };

    const diary = await updateDiary(id, updates);
    if (!diary) {
        res.status(404).json({ message: "Diary not found" });
        return;
    }

    res.json(diary);
};

// DELETE /diary/:id — delete a diary
export const deleteDiaryHandler = async (req: AuthRequest, res: Response) => {
    const id = req.params.id as string;
    const success = await deleteDiary(id);
    if (!success) {
        res.status(404).json({ message: "Diary not found" });
        return;
    }
    res.status(204).send();
};
