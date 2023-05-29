import { app } from '../configs/server.js';
import { getUserPlaylists } from '../controllers/user_controller.js';

export default function configureUserRoutes() {
    app.get('/:user&:playlists', getUserPlaylists);
}
