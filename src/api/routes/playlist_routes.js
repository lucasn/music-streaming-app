import { app } from '../configs/server.js';
import {
    getSongsFromPlaylist,
    createPlaylist,
    deletePlaylist,
    modifyPlaylist
} from '../controllers/playlist_controller.js';

export default function configurePlaylistRoutes() {
    app.post('/playlist', createPlaylist);
    app.delete('/playlist/:playlistId', deletePlaylist);
    app.patch('/playlist', modifyPlaylist);
    app.get('/playlist/:playlistId/songs', getSongsFromPlaylist);
}