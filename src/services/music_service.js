import prisma from "../configs/database.js";

export async function getUserPlaylists(userId) {
    const playlists = await prisma.playlist.findMany({
        where: {
            authorId: userId
        }
    });

    return playlists;
}

export async function getSongsFromPlaylist(playlistId) {

    const playlist = await prisma.playlist.findUnique({
        where: {
            id: playlistId
        },
        select: {
            title: true,
            songs: {
                select: {
                    id: true,
                    title: true,
                    updatedAt: true,
                    albumId: true,
                    album: {
                        select: {
                            name: true,
                            artistId: true,
                            artist: {
                                select: {
                                    name: true
                                }
                            }
                        }
                    }
                }
            }
        }
    });

    return playlist;
}

export async function createUser(user) {
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

export async function getUserByEmail(email) {
    const user = await prisma.user.findUnique({
        where: {email: email}
    });

    return user;
}

export async function getUserById(id) {
    const user = await prisma.user.findUnique({
        where: {id: id},
        include: {
            playlists: true
        }
    });

    return user;
}

export async function createPlaylist(userId, playlistName) {
    const playlist = await prisma.playlist.create({
        data: {
            title: playlistName,
            authorId: userId
        }
    });

    return playlist;
}