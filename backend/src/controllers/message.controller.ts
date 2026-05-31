import { Request, Response } from 'express'
import { MessageModel } from '../models/message.model'

export const getMessages = async (_req: Request, res: Response) => {
  try {
    const messages = await MessageModel.findAll()
    if(messages.length === 0) {
      return res.status(404).json({ error: 'No messages found' })
    }
    res.json(messages)
  } catch (error) {
    console.error("🔥 Error fetching messages", error)
    res.status(500).json({ error: 'Failed to fetch messages' })
  }
}

export const createMessage = async (req: Request, res: Response) => {
  const userId = (req as any).userId || 'anonymous' 
  const { text, username } = req.body
  if (!text || text.trim().length === 0)
    return res.status(400).json({ error: 'Text is required' })
  if (text.length > 500)
    return res.status(400).json({ error: 'Text must be 500 characters or less' })

  try {
    console.log("creating with:", { userId, text: text.trim(), username })  // ← เพิ่มตรงนี้
    const message = await MessageModel.create(userId, text.trim(), username)
    res.status(201).json(message)
  } catch (error) {
    console.error("🔥 Error:", error)
    res.status(500).json({ error: 'Failed to create message' })
  }
}

export const updateMessage = async (req: Request, res: Response) => {
  const userId = (req as any).userId; // แก้ไขให้ตรงกัน
  if (!userId) return res.status(401).json({ error: 'Unauthorized' })

  const { id } = req.params
  const { text } = req.body

  if (!text || text.trim().length === 0)
    return res.status(400).json({ error: 'Text is required' })
  if (text.length > 500)
    return res.status(400).json({ error: 'Text must be 500 characters or less' })

  try {
    const existing = await MessageModel.findById(id as string);
    if (!existing) return res.status(404).json({ error: 'Message not found' })
    if (existing.userId !== userId) return res.status(403).json({ error: 'Forbidden' })

    const updated = await MessageModel.update(id as string, text.trim())
    res.json(updated)
  } catch {
    res.status(500).json({ error: 'Failed to update message' })
  }
}

export const deleteMessage = async (req: Request, res: Response) => {
  const userId = (req as any).userId; // แก้ไขให้ตรงกัน
  if (!userId) return res.status(401).json({ error: 'Unauthorized' })

  const { id } = req.params

  try {
    const existing = await MessageModel.findById(id as string)
    if (!existing) return res.status(404).json({ error: 'Message not found' })
    if (existing.userId !== userId) return res.status(403).json({ error: 'Forbidden' })

    await MessageModel.delete(id as string)
    res.json({ success: true })
  } catch {
    res.status(500).json({ error: 'Failed to delete message' })
  }
}