import { apiBaseURL } from "../configs/server.js";

export async function createArtistInDatabase(artist){
    const createdArtist = await prisma.artist.create({
        data: artist
    });

    return createdArtist;
}

export async function createAlbumInDatabase(album){
    const createdAlbum = await prisma.album.create({
        data: album
    });
    return createdAlbum;
}

export async function createSongInDatabase(song){
    const createdSong = await prisma.song.create({
        data: song
    });
    return createdSong;
}

export async function getArtistById(artistId){
    const response = await fetch(`${apiBaseURL}/artist/${artistId}`);

    if (response.status == 200) {
        const artist = await response.json();
        return artist;
    }
    return null;
}

export async function getArtistByEmail(email){
    const artist = await prisma.artist.findUnique({
        where: {
            email: email
        },
        select: {
            id: true,
            password: true
        }
    });

    return artist;
}

export async function getArtistTopSongs(artistId){
    const response = await fetch(`${apiBaseURL}/song?top=3&order_by_plays=true`);

    if (response.status === 200) {
        const songs = await response.json();
        return songs;
    }
}

export function getArtistAudience(artistId){
    const audienceLast24h = 125625;
    return audienceLast24h.toLocaleString();
}

export async function getArtistAlbums(artistId){
    const response = await fetch(`${apiBaseURL}/album/?artist_id=${artistId}`);

    if (response.status === 200) {
        const album = response.json();
        return album;
    }
    return null;
}

export async function getAlbumById(albumId) {
    const response = await fetch(`${apiBaseURL}/album/${albumId}?include_songs=true`);
    const album = await response.json();

    return album;
}

export async function deleteArtist(artistId) {
    const response = await fetch(`${apiBaseURL}/artist/${artistId}`, {
        method: 'delete'
    });
}