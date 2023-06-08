import { app } from '../configs/server.js';
import { getHomePage, getPlaylistByName, getHomeContent } from '../controllers/user_controller.js';

export default function configureUserRoutes() {
    app.get('/:user_id', getHomePage);
    app.get('/playlists/:playlistName', getPlaylistByName);
    app.get('/home-content', getHomeContent);
}
    