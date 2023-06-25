import { app } from '../configs/server.js';
import { 
    getSong, 
    getSongAudio,
    getAllSongs,
    searchSongs
} from '../controllers/song_controller.js';

export default function configureSongRoutes() {
    app.get('/song/', getAllSongs);
    app.get('/song/:songId', getSong);
    app.get('/song/:songId/audio', getSongAudio);
    app.get('/songs/', searchSongs);
}