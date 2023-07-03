import configureUserRoutes from "../routes/user_routes.js";
import configurePlaylistRoutes from "../routes/playlist_routes.js"
import configureSongRoutes from "../routes/song_routes.js"
import configureArtistRoutes from "../routes/artist_routes.js"
import configureAlbumRoutes from "../routes/album_routes.js";
import configureRecordCompanyRoutes from "../routes/record_company_routes.js";
import configureAuthRoutes from "../routes/auth_routes.js";

export default function configureRoutes() {
    configureUserRoutes();
    configurePlaylistRoutes();
    configureSongRoutes();
    configureArtistRoutes();
    configureAlbumRoutes();
    configureRecordCompanyRoutes();
    configureAuthRoutes();
}