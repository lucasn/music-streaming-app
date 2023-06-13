import { app } from '../configs/server.js';
import {getArtistHomePage, getArtistAddPage, getArtistAlbumsPage, getAddSongPage, createSong, createAlbum, getAlbum, getAlbumPage} from '../controllers/artist_controller.js';
import multer from 'multer'

let upload = multer({ dest:'uploads/' });

export default function configureArtistRoutes() {
    app.get('/artist/:artistId', getArtistHomePage);
    app.get('/artist/:artistId/add', getArtistAddPage);
    app.get('/artist/:artistId/albums', getArtistAlbumsPage);
    app.get('/artist/:artistId/album/:albumId', getAlbumPage)
    app.get('/artist/:artistId/album/:albumId/addSong', getAddSongPage)
    app.post('/artist/:artistId/album/:albumId/song', upload.single('audio'), createSong)
    app.get('/album/:albumId', getAlbum);
    app.post('/artist/:artistId/album', upload.single('cover'), createAlbum);
}