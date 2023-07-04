import { app } from '../configs/server.js';
import {
    createArtist,
    deleteArtist,
    getArtist,
    getAllArtists,
    searchArtists
} from '../controllers/artist_controller.js';

export default function configureArtistRoutes() {
    app.post('/artist', createArtist);
    app.get('/artist', getAllArtists);
    app.get('/artist/:artistId', getArtist);
    app.delete('/artist/:artistId', deleteArtist);
    app.get('/artists/', searchArtists);
}