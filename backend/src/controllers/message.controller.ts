import { Request, Response } from 'express'
import { MessageModel } from '../models/message.model'

// GET /api/messages — public
export const getMessages = async (_req: Request, res: Response) => {
  try {
    const messages = await MessageModel.findAll()
    res.json(messages)
  } catch {
    res.status(500).json({ error: 'Failed to fetch messages' })
  }
}

// POST /api/messages — auth required
export const createMessage = async (req: Request, res: Response) => {
  const userId = req.user?.id
  if (!userId) return res.status(401).json({ error: 'Unauthorized' })

  const { text } = req.body
  if (!text || text.trim().length === 0)
    return res.status(400).json({ error: 'Text is required' })
  if (text.length > 500)
    return res.status(400).json({ error: 'Text must be 500 characters or less' })

  try {
    const message = await MessageModel.create(userId, text.trim())
    res.status(201).json(message)
  } catch {
    res.status(500).json({ error: 'Failed to create message' })
  }
}

// PATCH /api/messages/:id — owner only
export const updateMessage = async (req: Request, res: Response) => {
  const userId = req.user?.id
  if (!userId) return res.status(401).json({ error: 'Unauthorized' })

  const { id } = req.params
  const { text } = req.body

  if (!text || text.trim().length === 0)
    return res.status(400).json({ error: 'Text is required' })
  if (text.length > 500)
    return res.status(400).json({ error: 'Text must be 500 characters or less' })

  try {
    const existing = await MessageModel.findById(id)
    if (!existing) return res.status(404).json({ error: 'Message not found' })
    if (existing.userId !== userId) return res.status(403).json({ error: 'Forbidden' })

    const updated = await MessageModel.update(id, text.trim())
    res.json(updated)
  } catch {
    res.status(500).json({ error: 'Failed to update message' })
  }
}

// DELETE /api/messages/:id — owner only
export const deleteMessage = async (req: Request, res: Response) => {
  const userId = req.user?.id
  if (!userId) return res.status(401).json({ error: 'Unauthorized' })

  const { id } = req.params

  try {
    const existing = await MessageModel.findById(id)
    if (!existing) return res.status(404).json({ error: 'Message not found' })
    if (existing.userId !== userId) return res.status(403).json({ error: 'Forbidden' })

    await MessageModel.delete(id)
    res.json({ success: true })
  } catch {
    res.status(500).json({ error: 'Failed to delete message' })
  }
}