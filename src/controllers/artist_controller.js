import { 
    getArtistInfo, 
    getArtistTopSongs, 
    getArtistAudience, 
    getArtistAlbums, 
    createAlbumInDatabase,
    createSongInDatabase,
    getAlbumById
} from "../services/artist_service.js"
import { getFileAsByte } from '../services/image_service.js'

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

export async function getAddSongPage(req, res) {
    const artistId = parseInt(req.params.artistId);
    const albumId = parseInt(req.params.albumId);

    const artist = await getArtistInfo(artistId);

    res.render('components/add_song_form', {albumId: albumId, artist: artist})
}

export async function createSong(req, res) {
    const albumId = parseInt(req.params.albumId);

    let audio;

    if(req.file) {
        audio = await getFileAsByte(req.file.path);
    } else {
        audio = null;
    }

    const song = {
        title: req.body.title,
        audioFile: audio,
        albumId: albumId
    }

    await createSongInDatabase(song);
    await getArtistAlbumsPage(req, res);
}
export async function createAlbum(req, res) {
    const artistId = parseInt(req.params.artistId);

    let cover;

    if(req.file){
        cover = await getFileAsByte(req.file.path);
    } else {
        cover = null;
    }

    const album = {
        name: req.body.name,
        year: parseInt(req.body.year),
        artistId: artistId, 
        cover: cover
    };
    
    await createAlbumInDatabase(album);
    await getArtistAlbumsPage(req, res);
}

export async function getAlbumPage(req, res){
    const artistId = parseInt(req.params.artistId);
    const albumId = parseInt(req.params.albumId);

    const album = await getAlbumById(albumId);

    res.render('components/artista_album_content', {artistId: artistId, album: album})
}

export async function getAlbum(req, res) {
    const albumId = parseInt(req.params.albumId);
    const album = await getAlbumById(albumId);

    res.render('components/album_content', {album: album});
}