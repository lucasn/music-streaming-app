import { getArtistInfo, getArtistTopSongs, getArtistAudience, getArtistAlbums } from "../services/artist_service.js"
import multipart from 'lambda-multipart-parser'

export async function getArtistHomePage(req, res) {
    const artistId = parseInt(req.params.artistId);
    const artist = await getArtistInfo(artistId);
    const topSongs = await getArtistTopSongs(artistId)

    res.render('index_artista', {statsPage: true, artist: artist, topSongs: topSongs, audience: getArtistAudience(artistId)});
}

export async function getArtistAddPage(req, res) {
    const artistId = parseInt(req.params.artistId);
    const artist = await getArtistInfo(artistId);
    res.render('artista_add', {addPage: true, artist: artist});
}

export async function getArtistAlbumsPage(req, res) {
    const artistId = parseInt(req.params.artistId);
    const artist = await getArtistInfo(artistId);
    const albums = await getArtistAlbums(artistId);

    res.render('artista_albuns', {albumsPage: true, artist: artist, albums: albums});
}

export async function createAlbum(req, res) {
    const artistId = parseInt(req.params.artistId);
    const artist = await getArtistInfo(artistId);
    console.log(req.body);
    res.render('artista_add', {addPage: true, artist: artist});
}