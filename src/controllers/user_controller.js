import { 
    getUserPlaylists, 
    getSongsFromPlaylist, 
    createUser as createUserInDatabase,
    getUserByEmail,
    getUserById,
    createPlaylist as createPlaylistInDatabase,
    getSongsByName,
    deletePlaylistById,
    addSongToPlaylistById
} from "../services/music_service.js";

import fs from 'fs/promises';

export async function getIndexPage(req, res) {

    const userId = parseInt(req.cookies.user_id);

    if (userId) {
        const user = await getUserById(userId);

        if (user) {
            res.render('index_user', {playlists: user.playlists, user: user});
            return;
        }
    }

    res.render('index');
}

export function getSigninPage(req, res) {
    res.render('signin', {userCreated: false});
}

export function getLoginPage(req, res) {
    res.render('login');
}

export async function performLogin(req, res) {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);

    if (!user || user.password !== password) {
        res.render('error', {message: 'Usuário ou Senha incorretos'});
    }

    res.cookie('user_id', user.id);

    res.redirect('/');
}

export async function getHomePage(req, res) {
    const userId = parseInt(req.params.user_id);

    const user = await getUserById(userId);

    res.render('index', {playlists: await getUserPlaylists(userId), user: user});
}

export async function getPlaylistById(req, res) {
    const playlistId = parseInt(req.params.playlist_id);

    const playlist = await getSongsFromPlaylist(playlistId);

    res.render('components/playlists_content', {playlist: playlist});
}

export function getHomeContent(req, res) {
    res.render('home');
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

export async function createPlaylistByClient(req, res) {
    const userId = parseInt(req.params.user_id);
    const playlistName = req.body.playlist_name;

    let user = await getUserById(userId);

    if (user) {
        await createPlaylistInDatabase(userId, playlistName);
        user = await getUserById(userId)
        res.render('partials/playlists_cards', {playlists: user.playlists});
        return;
    }

    res.render('error');
}

export async function getMusic(req, res) {
    const song = await fs.readFile('public/musica.mp3');
    res.end(song);
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
    const playlistId = parseInt(req.params.playlist_id);

    await deletePlaylistById(playlistId);

    res.status(204).end();
}

export async function getPlaylistsByUserId(req, res) {
    const userId = parseInt(req.params.user_id);

    const playlists = await getUserPlaylists(userId);

    res.render('partials/playlists_cards', {playlists: playlists});
}

export async function searchPlaylistsByUserId(req, res) {
    const userId = parseInt(req.params.user_id);

    const playlists = await getUserPlaylists(userId);

    res.json(playlists);
}

export async function addSongToPlaylist(req, res) {
    const songId = req.body.songId;
    const playlistId = req.body.playlistId;
    
    await addSongToPlaylistById(songId, playlistId);

    return res.status(200).end();
}