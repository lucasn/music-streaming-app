import { app } from './configs/server.js';

import { getUserPlaylists } from '../controllers/user_controller.js';

export function configureRoutes() {
    app.get('/:user&:playlists', getUserPlaylists);
}
