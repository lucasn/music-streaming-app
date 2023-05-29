import { getUserPlaylist } from "../services/music_service.js";

export function getUserPlaylists(req, res) {
    const user = req.params.user === 'user' ? true : false;
    const playlists = req.params.playlists === 'playlists' ? true : false;
    res.render('index', {user: user, playlists: playlists, musics: getUserPlaylist(user, playlists)});
}