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