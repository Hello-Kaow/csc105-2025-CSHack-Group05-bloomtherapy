import prisma from "../lib/prisma"
import type { Diary } from "../generated/prisma/client.js";

// Get diary by user
const findDiaryByUser = async (authorId: string) => {
    return await prisma.diary.findMany({
        where: {authorId},
        orderBy: { date: "desc" },
    });
};

// Create new diary
const createDiary = async (title: string, story: string, date: Date, authorId: string): Promise<Diary> => {
    return await prisma.diary.create({
        data: { title, story, date, authorId}
    });
};

type DiaryUpdateInput = { title?: string; story?: string; date?: Date };

// Update diary
const updateDiary = async (id: string, updates: DiaryUpdateInput): Promise<Diary | null> => {
    try{
        return await prisma.diary.update({
            where: {id},
            data: updates,
        });
    }
    catch{
        return null;
    }
};

// Delete diary
const deleteDiary = async (id: string): Promise<boolean> => {
    try{
        await prisma.diary.delete({
            where: {id}
        });
        return true;
    }
    catch{
        return false;
    }
};

export {
    findDiaryByUser,
    createDiary,
    updateDiary,
    deleteDiary
};