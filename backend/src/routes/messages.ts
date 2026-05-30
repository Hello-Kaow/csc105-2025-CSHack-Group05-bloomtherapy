import { Router, Request, Response } from "express";
import prisma from "../lib/prisma";

const router = Router();

// GET / - list messages, optional query ?testName=...
router.get("/", async (req: Request, res: Response) => {
  try {
    const testName = req.query.testName as string | undefined;
    const where = testName ? { where: { testName } } : {};
    const messages = await prisma.message.findMany({
      ...(testName ? { where: { testName } } : {}),
      orderBy: { createdAt: "desc" },
    });
    res.json(messages);
  } catch (err) {
    console.error("GET /api/messages error:", err);
    res.status(500).json({ message: "Failed to fetch messages", detail: String(err) });
  }
});

// POST / - create a message { message, testName }
router.post("/", async (req: Request, res: Response) => {
  try {
    const { message, testName } = req.body as { message?: string; testName?: string };
    if (!message || !message.trim() || !testName) {
      return res.status(400).json({ message: "message and testName are required" });
    }
    const created = await prisma.message.create({
      data: { message: message.trim(), testName },
    });

    res.status(201).json(created);
  } catch (err) {
    console.error("POST /api/messages error:", err);
    res.status(500).json({ message: "Failed to create message", detail: String(err) });
  }
});

export default router;
