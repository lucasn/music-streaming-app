import { app } from '../configs/server.js';
import { getHomePage, getPlaylistByName, getHomeContent } from '../controllers/user_controller.js';

export default function configureUserRoutes() {
    app.get('/user/:user_id', getHomePage);
    app.get('/playlists/:playlist_id', getPlaylistByName);
    app.get('/home-content', getHomeContent);
}
    