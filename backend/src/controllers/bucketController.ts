import { Request, Response } from "express";
import prisma from "../lib/prisma.js";


export const getBuckets = async (req: Request, res: Response) => {
    try {
        const buckets = await prisma.bucket.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        res.status(200).json(buckets);
    } catch (error) {
        console.error("Failed to get buckets:", error);
        res.status(500).json({ message: "Failed to get buckets" });
    }
};

export const createBucket = async (req: Request, res: Response) => {
    try {
        const { title, description, completed, tag, achievedDay } = req.body;

        if (!title || !title.trim()) {
            return res.status(400).json({ message: "Title is required" });
        }

        const bucket = await prisma.bucket.create({
            data: {
                title: title.trim(),
                description: description || null,
                completed: completed ?? false,
                tag: tag || null,
                achievedDay: achievedDay ?? null,
            },
        });

        res.status(201).json(bucket);
    } catch (error) {
        console.error("Failed to create bucket:", error);
        res.status(500).json({ message: "Failed to create bucket" });
    }
};

export const updateBucket = async (
    req: Request<{ id: string }>,
    res: Response
) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(400).json({ message: "Bucket id is required" });
        }

        const { title, description, completed, tag, achievedDay } = req.body;

        const bucket = await prisma.bucket.update({
            where: {
                id: id,
            },
            data: {
                title,
                description,
                completed,
                tag,
                achievedDay,
            },
        });

        res.status(200).json(bucket);
    } catch (error) {
        console.error("Failed to update bucket:", error);
        res.status(500).json({ message: "Failed to update bucket" });
    }
};

export const deleteBucket = async (
    req: Request<{ id: string }>,
    res: Response
) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(400).json({ message: "Bucket id is required" });
        }

        await prisma.bucket.delete({
            where: {
                id: id,
            },
        });

        res.status(204).send();
    } catch (error) {
        console.error("Failed to delete bucket:", error);
        res.status(500).json({ message: "Failed to delete bucket" });
    }
};