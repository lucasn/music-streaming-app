import { 
    getUserPlaylists, 
    getSongsFromPlaylist, 
    createUser as createUserInDatabase,
    getUserById,
    createPlaylist as createPlaylistInDatabase,
    getSongsByName,
    deletePlaylistById,
    addSongToPlaylistById,
    removeSongFromPlaylistById,
    retrieveSong,
    retrieveSongFileStream,
    renamePlaylist as renamePlaylistInDatabase,
    deleteUser as deleteUserInDatabase
} from "../services/music_service.js";

import userService from "../services/user_service.js";


export async function getIndexPage(req, res) {
    if (req.credentials) {
        const playlists = await getUserPlaylists(req.credentials.id);

        res.render('index_user', {playlists: playlists, userName: req.credentials.name});
        return;
    }
    res.render('index');
}

export function getSigninPage(req, res) {
    res.render('signin', {userCreated: false});
}

export function getLoginPage(req, res) {
    res.render('login', {loginFailed: false});
}

export async function getHomePage(req, res) {
    const userId = parseInt(req.params.user_id);

    const user = await getUserById(userId);

    res.render('index', {playlists: await getUserPlaylists(userId), user: user});
}

export async function performLogin(req, res) {
    const { email, password } = req.body;

    const token = await userService.login(email, password);
    
    if (!token || token.type === 'artist') {
        res.render('login', {loginFailed: true});
        return;
    }

    res.cookie('token', token);

    res.redirect('/');
}



export async function getPlaylistById(req, res) {
    const playlistId = parseInt(req.params.playlist_id);

    const playlist = await getSongsFromPlaylist(playlistId);

    res.render('components/playlists_content', {playlist: playlist});
}

export function getHomeContent(req, res) {
    res.render('home', {userName: req.credentials.name});
}

export async function createUser(req, res) {
    try {
        const user = req.body;
        await createUserInDatabase(user);
    }
    catch (err) {
        console.log(err.message);
        res.render('error');
        return;
    }

    res.render('signin', {userCreated: true});
}

export async function createPlaylist(req, res) {
    const userId = parseInt(req.credentials.id);
    const playlistName = req.body.playlist_name;

    let user = await getUserById(userId);

    if (user) {
        await createPlaylistInDatabase(userId, playlistName);
        const playlists = await getUserPlaylists(userId);
        res.render('partials/playlists_cards', {playlists: playlists});
        return;
    }

    res.render('error');
}

export async function searchSongs(req, res) {
    const searchString = req.query.search_string;

    if (!searchString) {
        return res.json([]);
    }

    const songs = await getSongsByName(searchString);

    res.json(songs);
}

export async function deletePlaylist(req, res) {
    const playlistId = parseInt(req.params.playlistId);

    await deletePlaylistById(req.token, playlistId);

    res.status(204).end();
}

export async function renamePlaylist(req, res) {
    const playlistId = req.params.playlistId;
    const playlistName = req.body.playlistName;

    if (playlistId && playlistName) {
        await renamePlaylistInDatabase(playlistId, playlistName);
        res.status(200).end();
    }
    else {
        res.status(400).end();
    }
}

export async function getPlaylistsByUserId(req, res) {
    const userId = parseInt(req.credentials.id);

    const playlists = await getUserPlaylists(userId);

    res.render('partials/playlists_cards', {playlists: playlists});
}

export async function searchPlaylistsByUserId(req, res) {
    const userId = req.credentials.id;

    const playlists = await getUserPlaylists(userId);

    res.json(playlists);
}

export async function addSongToPlaylist(req, res) {
    const songId = req.body.songId;
    const playlistId = req.body.playlistId;
    
    await addSongToPlaylistById(songId, playlistId);

    return res.status(200).end();
}

export async function removeSongFromPlaylist(req, res) {
    const songId = req.body.songId;
    const playlistId = req.body.playlistId;

    await removeSongFromPlaylistById(playlistId, songId);

    res.status(200).end();
}

export async function getSongInfo(req, res) {
    const songId = parseInt(req.params.song_id);

    const song = await retrieveSong(songId);

    return res.json(song);
}

export async function getSongFile(req, res) {
    const songId = parseInt(req.params.song_id);
    const songStream = await retrieveSongFileStream(songId);

    const reader = songStream.getReader();

    let done = false, value;
    while (!done) {
        ({value, done} = await reader.read());
        if (done) {
            res.end();
            return;
        }
        res.write(value);
    }
}

export async function getConfigPage(req, res) {
    res.render('partials/user_config');
}

export async function deleteUser(req, res) {
    const userId = req.credentials.id;

    await deleteUserInDatabase(userId);

    return res.status(200).end();
}