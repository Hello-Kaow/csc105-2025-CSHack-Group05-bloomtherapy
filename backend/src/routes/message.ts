import { Router } from 'express'
import { authMiddleware } from '../middleware/auth.middleware'
import { optionalAuthMiddleware } from '../middleware/optionalAuth.middleware'
import {
  getMessage,
  createMessage,
  updateMessage,
  deleteMessage,
} from '../controllers/message.controller'

const router = Router()

router.get('/', getMessage)                    
router.post('/', optionalAuthMiddleware, createMessage)    
router.patch('/:id', authMiddleware, updateMessage)   
router.delete('/:id', authMiddleware, deleteMessage)  
export default router