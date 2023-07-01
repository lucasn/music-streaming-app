import { app } from '../configs/server.js';
import { 
    getHomePage, 
    getPlaylistById, 
    getHomeContent, 
    getIndexPage, 
    getSigninPage, 
    getLoginPage, 
    createUser, 
    performLogin,
    createPlaylist,
    searchSongs,
    deletePlaylist,
    getPlaylistsByUserId,
    searchPlaylistsByUserId,
    addSongToPlaylist,
    removeSongFromPlaylist,
    getSongInfo,
    getSongFile,
    getConfigPage,
    renamePlaylist
} from '../controllers/user_controller.js';

export default function configureUserRoutes() {
    app.get('/', getIndexPage);
    app.get('/signin', getSigninPage);
    app.get('/login', getLoginPage);
    app.post('/login', performLogin);
    app.get('/user/playlists', getPlaylistsByUserId);
    app.get('/user/:user_id', getHomePage);
    app.post('/user/playlists', createPlaylist);
    app.get('/playlists/:playlist_id', getPlaylistById);
    app.get('/home-content', getHomeContent);
    app.post('/user', createUser);
    app.get('/search', searchSongs);
    app.delete('/playlists/:playlistId', deletePlaylist);
    app.get('/user/playlists/search', searchPlaylistsByUserId);
    app.post('/playlists/song', addSongToPlaylist);
    app.post('/playlists/song/remove', removeSongFromPlaylist);
    app.put('/playlists/:playlistId', renamePlaylist);
    app.get('/song/:song_id', getSongInfo);
    app.get('/song/:song_id/file', getSongFile);
    app.get('/configs', getConfigPage)
}
    