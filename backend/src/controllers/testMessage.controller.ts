import { Request, Response } from "express";
import { TestMessageModel } from "../models/testMessage.model";

export const getTestMessages = async (req: Request, res: Response) => {
  const { testName } = req.query;
  if (!testName || typeof testName !== "string")
    return res.status(400).json({ error: "testName is required" });

  try {
    const messages = await TestMessageModel.findByTest(testName);
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch messages" });
  }
};

export const createTestMessage = async (req: Request, res: Response) => {
  const { message, testName } = req.body;
  if (!message?.trim() || !testName?.trim())
    return res.status(400).json({ error: "message and testName are required" });

  try {
    const created = await TestMessageModel.create(message.trim(), testName.trim());
    res.status(201).json(created);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create message", detail: String(error) });
  }
};