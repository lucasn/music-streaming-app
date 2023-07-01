import { app } from '../configs/server.js';
import { 
    createSong,
    deleteSong,
    getSong, 
    getSongAudio,
    getAllSongs,
    searchSongs
} from '../controllers/song_controller.js';

export default function configureSongRoutes() {
    app.post('/song', createSong);
    app.delete('/song/:songId', deleteSong);
    app.get('/song/', getAllSongs);
    app.get('/song/:songId', getSong);
    app.get('/song/:songId/audio', getSongAudio);
    app.get('/songs/', searchSongs);
}