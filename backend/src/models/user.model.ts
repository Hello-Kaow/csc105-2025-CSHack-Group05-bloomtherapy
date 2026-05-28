import prisma from "../lib/prisma"
import type { User } from "../generated/prisma/client.js";

// Get user by username
const findUserByUsername = async (username: string): Promise<User | null> => {
    return await prisma.user.findUnique({
        where: {username}
    });
};

// Create new user
const createUser = async ( username: string, hashedPassword: string): Promise<User> => {
    return await prisma.user.create({
        data: {
            username,
            password: hashedPassword,
        },
    });
}

// Export all the model function at the bottom
export{
    findUserByUsername,
    createUser
}