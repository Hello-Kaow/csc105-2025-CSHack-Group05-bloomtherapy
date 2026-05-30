import { Router } from 'express'
import { authMiddleware } from '../middleware/auth.middleware'
import {
  getMessages,
  createMessage,
  updateMessage,
  deleteMessage,
} from '../controllers/message.controller'

const router = Router()

router.get('/', getMessages)                          // public
router.post('/', authMiddleware, createMessage)       // auth required
router.patch('/:id', authMiddleware, updateMessage)   // owner only
router.delete('/:id', authMiddleware, deleteMessage)  // owner only

export default router