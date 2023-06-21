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

async function createPlaylist(playlistTitle, authorId){
    const playlist = await prisma.playlist.create({
        data: {
            title: playlistTitle,
            authorId: authorId
        }
    });

    return playlist;
}

const userService = {
    createUser,
    getUser,
    getAllUsers,
    createPlaylist
};
export default userService;