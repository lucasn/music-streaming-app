import { getUserPlaylists, getMusicsFromPlaylist } from "../services/music_service.js";

export async function getHomePage(req, res) {
    const userId = req.params.user;

    res.render('index', {playlists: await getUserPlaylists(userId)});
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