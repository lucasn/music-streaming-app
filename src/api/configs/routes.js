import configureUserRoutes from "../routes/user_routes.js";
import configurePlaylistRoutes from "../routes/playlist_routes.js"
import configureSongRoutes from "../routes/song_routes.js"

export default function configureRoutes() {
    configureUserRoutes();
    configurePlaylistRoutes();
    configureSongRoutes();
}