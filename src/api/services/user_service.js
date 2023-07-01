import prisma from "../configs/database.js"
import { NotFoundError, ConflictError, InternalServerError } from "../errors/errors.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";

async function createUser(user) {
    try {
        const createdUser = await prisma.user.create({
            data: {
                ...user,
                playlists: {
                    create: {
                        title: 'Músicas Curtidas'
                    }
                }
            }
        });
    
        return createdUser;    
    } 
    catch (err) {
        if(err instanceof PrismaClientKnownRequestError && err.code === 'P2002')
            throw new ConflictError(`User with ${err.meta.target[0]} ${user[err.meta.target[0]]} already exists`);
        
        throw new InternalServerError();
    }
}

async function deleteUser(userId) {
    try {
        const deletedUser = await prisma.user.delete({
            where: {
                id: userId
            },
            select: {
                id: true,
                email: true,
                name: true,
                playlists: {
                    select: {
                        id: true,
                        title: true
                    }
                }
            }
        });
    
        return deletedUser;    
    } 
    catch (err) {
        if(err instanceof PrismaClientKnownRequestError && err.code === 'P2025')
            throw new NotFoundError(`User with id ${userId} not found`);
        
        throw new InternalServerError();
    }
}

async function getUser(userId) {
    try {
        const user = await prisma.user.findUniqueOrThrow({
            where: {id: userId}
        });
    
        return user;    
    } 
    catch (err) {
        if(err instanceof PrismaClientKnownRequestError && err.code === 'P2025')
            throw new NotFoundError(`User with id ${userId} not found`);
        
            throw new InternalServerError;
    }
}

async function getAllUsers(filters) {
    const users = await prisma.user.findMany({
        where: {...filters}
    });

    return users;
}

async function getUserPlaylists(userId, includeSongs = false){
    let user;

    try{
        user = await prisma.user.findUniqueOrThrow({
            where: {
                id: userId
            }
        });
    } catch(err) {
        throw {
            status: 404,
            message: `User with id ${userId} not found`
        }
    }
    
    const playlists = await prisma.playlist.findMany({
        where: {
            author: user
        },
        include: {
            songs: includeSongs ? true : false
        }
    });

    return playlists;
}

const userService = {
    createUser,
    deleteUser,
    getUser,
    getAllUsers,
    getUserPlaylists
};
export default userService;