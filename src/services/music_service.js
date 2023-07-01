import { apiBaseURL } from "../configs/server.js";

export async function getUserPlaylists(userId) {
    const playlists = await fetch(`${apiBaseURL}/user/${userId}/playlists?include_songs=true`);
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

export async function getSongsByName(searchString) {
    const response = await fetch(`${apiBaseURL}/songs?search=${searchString}`);
    const songs = await response.json();

    return songs;
}

export async function deletePlaylistById(token, playlistId) {
    const response = await fetch(`${apiBaseURL}/playlist/${playlistId}`, {
        method: 'delete',
        headers: {'Authorization': `Bearer ${token}`}
    });
}

export async function addSongToPlaylistById(songId, playlistId) {
    const response = await fetch(`${apiBaseURL}/playlist`, {
        body: JSON.stringify({
            action: 'add',
            songId: songId,
            playlistId: playlistId
        }),
        headers: {'Content-Type': 'application/json'},
        method: 'PATCH'
    })

    if (response.status === 200) return (await response.json());
    return null;
}

export async function removeSongFromPlaylistById(playlistId, songId) {
    const response = await fetch(`${apiBaseURL}/playlist`, {
        method: 'PATCH',
        body: JSON.stringify({
            action: 'remove',
            playlistId: playlistId,
            songId: songId
        }),
        headers: {'Content-Type': 'application/json'}
    });

    if (response.status === 200) return (await response.json());
    return null;
}

export async function retrieveSong(songId) {
    const response = await fetch(`${apiBaseURL}/song/${songId}`);
    const songInfo = await response.json();

    return songInfo;
}

export async function retrieveSongFileStream(songId) {
    const response = await fetch(`${apiBaseURL}/song/${songId}/audio`);
    const songStream = response.body;

    return songStream;
}