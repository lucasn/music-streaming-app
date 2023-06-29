import { apiBaseURL } from "../configs/server.js";

export async function getUserPlaylists(userId) {
    const playlists = await fetch(`${apiBaseURL}/user/${userId}/playlists`);
    return playlists.json();
}

export async function getSongsFromPlaylist(playlistId) {

    const playlist = await fetch(`${apiBaseURL}/playlist/${playlistId}/songs`);

    return playlist.json();
}

export async function createUser(user) {
    const createdUser = await fetch(`${apiBaseURL}/user`, {
        method: 'post',
        body: JSON.stringify(user),
        headers: {'Content-Type': 'application/json'}
    });

    return createdUser;
}

export async function getUserByEmail(email) {
    const user = await fetch(`${apiBaseURL}/user?email=${email}`);

    return user.json();
}

export async function getUserById(id) {
    const user = await fetch(`${apiBaseURL}/user/${id}`);

    return user.json();
}

export async function createPlaylist(userId, playlistName) {
    const playlist = await fetch(`${apiBaseURL}/playlist`, {
        method: 'post',
        body: JSON.stringify({
            title: playlistName,
            authorId: userId
        }),
        headers: {'Content-Type': 'application/json'}
    });

    if (playlist.status !== 201) {
        console.log('Internal Error');
    }

    return playlist.json();
}

export async function getSongsByName(songName) {
    const deletePlaylist = await prisma.song.findMany({
        where: {
            title: {
                contains: songName
            }
        },
        include: {
            album: {
                include: {
                    artist: true
                }
            }
        }
    })

    return deletePlaylist;
}

export async function deletePlaylistById(playlistId) {
    const res = await prisma.playlist.delete({
        where: {
            id: playlistId
        }
    });
}

export async function addSongToPlaylistById(songId, playlistId) {

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

export async function removeSongFromPlaylistById(playlistId, songId) {
    const updatedPlaylist = await prisma.playlist.update({
        where: {
            id: playlistId
        },
        data: {
            songs: {
                disconnect:{
                    id: songId
                }
            }
        }
    });

    return updatedPlaylist;
}

export async function retrieveSong(songId) {
    const song = await prisma.song.findUnique({
        where: {
            id: songId
        },
        select: {
            title: true,
            id: true,
            album: {
                select: {
                    name: true,
                    cover: true,
                    artist: true
                }
            }
        }
    });

    if (song.album.cover){
        song.album.cover = song.album.cover.toString('base64');
    }

    return song;
}

export async function retrieveSongFile(songId) {
    const songFile = await prisma.song.findUnique({
        where: {
            id: songId
        },
        select: {
            audioFile: true
        }
    });

    return songFile.audioFile;
}