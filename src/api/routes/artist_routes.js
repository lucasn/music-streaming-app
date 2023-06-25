import { app } from '../configs/server.js';
import {
    createArtist,
    getArtist,
    getAllArtists
} from '../controllers/artist_controller.js';

export default function configureArtistRoutes() {
    app.post('/artist', createArtist);
    app.get('/artist', getAllArtists);
    app.get('/artist/:artistId', getArtist);
}