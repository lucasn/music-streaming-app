import prisma from "../configs/database.js"

export async function createAlbumInDatabase(album){
    const createdAlbum = await prisma.album.create({
        data: album
    });
    return createdAlbum;
}

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

export async function getArtistTopSongs(artistId){
    const artistTopSongs = await prisma.song.findMany({
        where: {
            album: {
                artistId: artistId
            }
        },
        orderBy: {
            plays: "desc"
        },
        select: {
            title: true,
            album: {
                select: {
                    cover: true,
                    artist: {
                        select: {
                            name: true
                        }
                    }
                }
            }
        },
        take: 3
    })

    artistTopSongs.forEach(song => {
        song.album.cover = song.album.cover.toString('base64');
    });

    return artistTopSongs;
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
        orderBy: {
            year: "asc"
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
        if(album.cover){
            album.cover = album.cover.toString('base64');
        }
    });
    
    return artistAlbums;
}

export async function getAlbumById(albumId) {
    const album = await prisma.album.findUnique({
        where: {
            id: albumId
        },
        include: {
            songs: true,
            artist: true
        }
    });

    return album;
}