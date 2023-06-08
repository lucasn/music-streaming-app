import { getArtistTopSongs, getArtistAudience, getArtistAlbums } from "../services/artistService.js"

export function getArtistHomePage(req, res) {
    res.render('index_artista', {songs: getArtistTopSongs('artistId'), audience: getArtistAudience('artistId')})
}

export function getArtistAddPage(req, res) {
    res.render('artista_add')
}

export function getArtistAlbumsPage(req, res) {
    res.render('artista_albuns', {albums: getArtistAlbums('artistId')})
}