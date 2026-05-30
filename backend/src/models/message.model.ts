import { prisma } from '../lib/prisma'

export const MessageModel = {
  findAll: () =>
    prisma.healMessage.findMany({
      orderBy: { createdAt: 'desc' },
    }),

  findById: (id: string) =>
    prisma.healMessage.findUnique({ where: { id } }),

  create: (userId: string, text: string) =>
    prisma.healMessage.create({
      data: { userId, text },
    }),

  update: (id: string, text: string) =>
    prisma.healMessage.update({
      where: { id },
      data: { text, edited: true },
    }),

  delete: (id: string) =>
    prisma.healMessage.delete({ where: { id } }),
}