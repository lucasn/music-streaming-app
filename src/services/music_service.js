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

export function getArtistTopSongs(artistId){
    return [
        {id: 1, title: 'Superman', artist: 'Eminem', albumCover: '/images/eminem-album.png'},
        {id: 2, title: 'Mockingbird', artist: 'Eminem', albumCover: '/images/eminem-album2.jpg'},
        {id: 3, title: 'Crazy in Love', artist: 'Eminem', albumCover: '/images/eminem-album2.jpg'}
    ]
}

export function getArtistAudience(artistId){
    const audienceLast24h = 125625;
    return audienceLast24h.toLocaleString();
}