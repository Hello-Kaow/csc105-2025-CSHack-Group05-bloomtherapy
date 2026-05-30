import prisma from "../lib/prisma";

export const MessageModel = {
  findAll: async () => {
    return await prisma.healMessage.findMany({
      orderBy: { createdAt: "desc" },
    });
  },

  findById: async (id: string) => {
    return await prisma.healMessage.findUnique({
      where: { id }
    });
  },

  create: async (userId: string, text: string, username: string = 'Anonymous') => {
    return await prisma.healMessage.create({
      data: {
        userId,
        text,
        username,
      }
    });
  },

  update: async (id: string, text: string) => {
    return await prisma.healMessage.update({
      where: { id },
      data: { 
        text, 
        edited: true 
      },
    });
  },
 delete: async (id: string) => {
    return await prisma.healMessage.delete({
      where: { id },
    });
  }
};