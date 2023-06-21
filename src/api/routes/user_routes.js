import { app } from '../configs/server.js';
import { 
    createUser,
    getAllUsers,
    getUser,
    createPlaylist
} from '../controllers/user_controller.js';

export default function configureUserRoutes() {
    app.post('/user', createUser);
    app.get('/user', getAllUsers);
    app.get('/user/:userId', getUser);
    app.post('/playlist', createPlaylist);
}