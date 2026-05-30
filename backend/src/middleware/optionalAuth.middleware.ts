import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-here'

export const optionalAuthMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (token) {
    try {
      const payload = jwt.verify(token, JWT_SECRET) as { userId: string }
      ;(req as any).userId = payload.userId
    } catch {
    }
  }
  next()
}