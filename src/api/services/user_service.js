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

async function deletePlaylist(playlistId){
    try {
        const deletedPlaylist = await prisma.playlist.delete({
            where: {id: playlistId}
        });
    
        return deletedPlaylist;
    } catch(err) {
        return null;
    }
}

async function addSongToPlaylist(songId, playlistId) {
    const updatedPlaylist = await prisma.playlist.update({
        where: {
            id: playlistId
        },
        data: {
            songs: {
                connect: {
                    id: songId
                }
            }
        }
    });

    return updatedPlaylist;
}

const userService = {
    createUser,
    getUser,
    getAllUsers,
    createPlaylist,
    deletePlaylist,
    addSongToPlaylist
};
export default userService;