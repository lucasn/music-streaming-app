import prisma from "../configs/database.js";

export async function getUserPlaylists(userId) {
    const playlists = await prisma.playlist.findMany({
        where: {
            userId: userId
        }
    });

    return playlists;
}

export function getMusicsFromPlaylist(playlistId) {
    return [
        {id: 1, title: 'Die For You', artist: 'The Weeknd'},
        {id:2, title: 'Call Out My Name', artist: 'The Weeknd'}
    ]
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