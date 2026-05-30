import prisma from "../lib/prisma";

// Get quote by userId — returns default text if not set yet
const getQuoteByUser = async (userId: string): Promise<string> => {
    const quote = await prisma.quote.findUnique({ where: { userId } });
    return quote?.text ?? "Make sure you live.";
};

// Upsert quote (create if not exists, update if exists)
const upsertQuote = async (userId: string, text: string): Promise<string> => {
    const quote = await prisma.quote.upsert({
        where: { userId },
        update: { text },
        create: { userId, text },
    });
    return quote.text;
};

export { getQuoteByUser, upsertQuote };
