import prisma from "../lib/prisma";

export const TestMessageModel = {
  findByTest: async (testName: string) => {
    return await prisma.testMessage.findMany({
      where: { testName },
      orderBy: { createdAt: "desc" },
    });
  },

  create: async (message: string, testName: string) => {
    return await prisma.testMessage.create({
      data: { message, testName },
    });
  },
};