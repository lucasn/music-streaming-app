import prisma from "../configs/database.js"

async function createUser(user) {
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

async function getUser(userId) {
    const user = await prisma.user.findUnique({
        where: {id: userId}
    });

    return user;
}

async function getAllUsers(filters) {
    const users = await prisma.user.findMany({
        where: {...filters}
    });

    return users;
}

async function getUserPlaylists(userId){
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
        }
    });

    return playlists;
}

const userService = {
    createUser,
    getUser,
    getAllUsers,
    getUserPlaylists
};
export default userService;