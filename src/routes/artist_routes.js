import { app } from '../configs/server.js';
import {getArtistHomePage, getArtistAddPage, getArtistAlbumsPage, createAlbum} from '../controllers/artist_controller.js';
import multer from 'multer'

let upload = multer({ dest:'uploads/' });

export default function configureArtistRoutes() {
    app.get('/artist/:artistId', getArtistHomePage);
    app.get('/artist/:artistId/add', getArtistAddPage);
    app.get('/artist/:artistId/albums', getArtistAlbumsPage);
    app.post('/artist/:artistId/album', upload.single('cover'), createAlbum);
}