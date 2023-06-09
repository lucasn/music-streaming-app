import prisma from "../configs/database.js"

export async function getArtistInfo(artistId){
    const artist = await prisma.artist.findUnique({
        where: {
            id: artistId
        },
        select: {
            id: true,
            name: true
        }
    });
    console.log(artist);
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

export function getArtistAlbums(artistId){
    return [
        {id: 1, title: 'The Marshall Matters', year: 2000, albumCover: '/images/eminem-album.png'},
        {id: 2, title: 'Encore', year: 2004, albumCover: '/images/eminem-album2.jpg'},
        {id: 3, title: 'The Marshall Matters', year: 2000, albumCover: '/images/eminem-album.png'},
        {id: 4, title: 'Encore', year: 2004, albumCover: '/images/eminem-album2.jpg'},
        {id: 5, title: 'The Marshall Matters', year: 2000, albumCover: '/images/eminem-album.png'},
        {id: 6, title: 'Encore', year: 2004, albumCover: '/images/eminem-album2.jpg'}
    ]
}