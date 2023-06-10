import prisma from "../configs/database.js"

export async function getArtistInfo(artistId){
    const artist = await prisma.artist.findUnique({
        where: {
            id: artistId
        },
        select: {
            id: true,
            name: true,
            profilePicture: true
        }
    });
    artist.profilePicture = artist.profilePicture.toString('base64');
    
    return artist;
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

export async function getArtistAlbums(artistId){
    const artistAlbums = await prisma.album.findMany({
        where: {
            artistId: artistId
        },
        select: {
            name: true,
            year: true,
            cover: true,
            artist: {
                select:{
                    name: true
                }
            }
        }
    });

    artistAlbums.forEach(album => {
        album.cover = album.cover.toString('base64');
    });
    
    return artistAlbums;
}