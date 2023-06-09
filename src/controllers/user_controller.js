import { getUserPlaylists, getSongsFromPlaylist } from "../services/music_service.js";

export function getIndexPage(req, res) {
    res.render('index');
}

export function getSigninPage(req, res) {
    res.render('signin');
}

export function getLoginPage(req, res) {
    res.render('login');
}

export async function getHomePage(req, res) {
    const userId = parseInt(req.params.user_id);

    res.render('index', {playlists: await getUserPlaylists(userId)});
}

export async function getPlaylistByName(req, res) {
    const playlistId = parseInt(req.params.playlist_id);

    const playlist = await getSongsFromPlaylist(playlistId);

    res.render('components/playlists_content', {playlist: playlist});
}

export function getHomeContent(req, res) {
    res.render('home');
}