import {
    getArtistById,
    getArtistByEmail,
    getArtistTopSongs,
    getArtistAudience,
    getArtistAlbums,
    createArtistInDatabase,
    createAlbumInDatabase,
    createSongInDatabase,
    getAlbumById
} from "../services/artist_service.js"
import { getFileAsByte, getDefaultCoverImage } from '../services/image_service.js'
import userService from "../services/user_service.js";

export function getArtistLoginPage(req, res) {
    res.render('artista_login');
}

export function getArtistSigninPage(req, res) {
    res.render('artista_signin');
}

export async function createArtist(req, res) {
    let profilePicture;

    if (req.file) {
        profilePicture = await getFileAsByte(req.file.path);
    }
    else {
        profilePicture = null;
    }

    const artist = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        profilePicture: profilePicture
    }

    try {
        await createArtistInDatabase(artist);
    } catch (err) {
        console.log(err.message);
        return;
    }
    res.render('artista_signin', { artistCreated: true });
}

export async function performArtistLogin(req, res) {
    const { email, password } = req.body;

    const token = await userService.login(email, password);

    if (!token || token.type === 'user') {
        res.render('artista_login', { loginFailed: true });
        return;
    }

    res.cookie('token', token);

    res.redirect('/artist');
}

export async function getArtistIndexPage(req, res) {
    if (req.credentials && req.credentials.type === 'artist') {
        const artistId = req.credentials.id;
        const artist = await getArtistById(artistId);
    
        if (artist) {
            const topSongs = await getArtistTopSongs(artistId);
            const renderData= {
                statsPage: true, 
                artist: artist,
                topSongs: topSongs,
                audience: getArtistAudience(artistId)
            };
            res.render('artista_home', renderData);
            return;
        }
        res.render('index_artista');
    }
    else res.render('index_artista');

}

export async function getArtistAddPage(req, res) {
    const artistId = parseInt(req.params.artistId);
    const artist = await getArtistById(artistId);
    res.render('artista_add', { addPage: true, artist: artist });
}

export async function getArtistAlbumsPage(req, res) {
    if (req.credentials && req.credentials.type === 'artist') {
        const artistId = req.credentials.id;
        const artist = await getArtistById(artistId);
        const albums = await getArtistAlbums(artistId);
        res.render('artista_albuns', { albumsPage: true, artist: artist, albums: albums });
    }
    else {
        res.redirect('/');
    }
}

export async function getAddSongPage(req, res) {
    const artistId = parseInt(req.params.artistId);
    const albumId = parseInt(req.params.albumId);

    const artist = await getArtistById(artistId);

    res.render('components/add_song_form', { albumId: albumId, artist: artist })
}

export async function createSong(req, res) {
    const artistId = parseInt(req.cookies.artist_id);
    const albumId = parseInt(req.params.albumId);

    let audio;

    if (req.file) {
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
    res.redirect(`/artist/${artistId}/albums`);
}
export async function createAlbum(req, res) {
    const artistId = parseInt(req.params.artistId);

    let cover;

    if (req.file) {
        cover = await getFileAsByte(req.file.path);
    } else {
        cover = await getDefaultCoverImage();
    }

    const album = {
        name: req.body.name,
        year: parseInt(req.body.year),
        artistId: artistId,
        cover: cover
    };

    await createAlbumInDatabase(album);
    res.redirect(`/artist/${artistId}/albums`);
}

export async function getAlbumPage(req, res) {
    const artistId = parseInt(req.params.artistId);
    const albumId = parseInt(req.params.albumId);

    const album = await getAlbumById(albumId);

    res.render('components/artista_album_content', { artistId: artistId, album: album })
}

export async function getAlbum(req, res) {
    const albumId = parseInt(req.params.albumId);
    const album = await getAlbumById(albumId);

    res.render('components/album_content', { album: album });
}