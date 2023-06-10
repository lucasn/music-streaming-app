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