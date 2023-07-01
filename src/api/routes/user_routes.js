import { app } from '../configs/server.js';
import { 
    createUser,
    deleteUser,
    getAllUsers,
    getUser,
    getUserPlaylists
} from '../controllers/user_controller.js';
import authenticate from '../middlewares/auth_middleware.js';

export default function configureUserRoutes() {
    app.post('/user', createUser);
    app.delete('/user/:userId', deleteUser)
    app.get('/user', authenticate, getAllUsers);
    app.get('/user/:userId', getUser);
    app.get('/user/:userId/playlists', getUserPlaylists);
}