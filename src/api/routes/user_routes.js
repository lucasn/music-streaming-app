import { app } from '../configs/server.js';
import { 
    createUser,
    getAllUsers,
    getUser,
    getUserPlaylists,
    getSongsFromPlaylist,
    createPlaylist,
    deletePlaylist,
    modifyPlaylist
} from '../controllers/user_controller.js';

export default function configureUserRoutes() {
    app.post('/user', createUser);
    app.get('/user', getAllUsers);
    app.get('/user/:userId', getUser);
    app.get('/user/:userId/playlists', getUserPlaylists);
    app.post('/playlist', createPlaylist);
    app.delete('/playlist', deletePlaylist);
    app.patch('/playlist', modifyPlaylist);
    app.get('/playlist/:playlistId/songs', getSongsFromPlaylist)
}