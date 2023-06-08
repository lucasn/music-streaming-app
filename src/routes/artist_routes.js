import { app } from '../configs/server.js';
import {getArtistHomePage, getArtistAddPage, getArtistAlbumsPage} from '../controllers/artist_controller.js';

export default function configureArtistRoutes() {
    app.get('/artist/:artistId', getArtistHomePage);
    app.get('/artist/:artistId/add', getArtistAddPage);
    app.get('/artist/:artistId/albums', getArtistAlbumsPage);
}