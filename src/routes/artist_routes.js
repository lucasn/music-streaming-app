import { app } from '../configs/server.js';
import {getArtistHomePage} from '../controllers/artist_controller.js';

export default function configureArtistRoutes() {
    app.get('/artist/:artistId', getArtistHomePage);
}