import { app } from '../configs/server.js';
import { 
    getSong, 
    getSongAudio,
    searchSongs
} from '../controllers/song_controller.js';

export default function configureSongRoutes() {
    app.get('/song/:songId', getSong);
    app.get('/song/:songId/audio', getSongAudio);
    app.get('/songs/', searchSongs);
}