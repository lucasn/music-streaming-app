import { app } from '../configs/server.js';
import { getHomePage, getPlaylistByName, 
    getHomeContent, getIndexPage, getSigninPage, getLoginPage } from '../controllers/user_controller.js';

export default function configureUserRoutes() {
    app.get('/', getIndexPage);
    app.get('/signin', getSigninPage);
    app.get('/signin', getLoginPage);
    app.get('/user/:user_id', getHomePage);
    app.get('/playlists/:playlist_id', getPlaylistByName);
    app.get('/home-content', getHomeContent);
}
    