import { getArtistInfo, getArtistTopSongs, getArtistAudience, getArtistAlbums } from "../services/artist_service.js"

export async function getArtistHomePage(req, res) {
    const artistId = parseInt(req.params.artistId);
    const artist = await getArtistInfo(artistId);
    res.render('index_artista', {statsPage: true, artist: artist, songs: getArtistTopSongs(artistId), audience: getArtistAudience(artistId)});
}

export async function getArtistAddPage(req, res) {
    const artistId = parseInt(req.params.artistId);
    const artist = await getArtistInfo(artistId);
    res.render('artista_add', {addPage: true, artist: artist});
}

export async function getArtistAlbumsPage(req, res) {
    const artistId = parseInt(req.params.artistId);
    const artist = await getArtistInfo(artistId);
    res.render('artista_albuns', {albumsPage: true, artist: artist, albums: getArtistAlbums('artistId')});
}