import { getArtistTopSongs } from "../services/music_service.js"

export function getArtistHomePage(req, res) {
    res.render('index_artista', {songs: getArtistTopSongs('artistId')})
}