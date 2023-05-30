import { getUserPlaylists, getMusicsFromPlaylist } from "../services/music_service.js";

export function getHomePage(req, res) {
    res.render('index', {musics: getUserPlaylists('user_id')});
}

export function getPlaylistByName(req, res) {
    const playlistName = req.params.playlistName;
    const musics = getMusicsFromPlaylist(playlistName);

    const data = {
        playlistName: playlistName,
        musics: musics
    }

    res.render('components/playlists_content', data);
}

export function getHomeContent(req, res) {
    res.render('home');
}