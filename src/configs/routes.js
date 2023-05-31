import configureUserRoutes from "../routes/user_routes.js";
import configureArtistRoutes from "../routes/artist_routes.js";

export default function configureRoutes() {
    configureUserRoutes();
    configureArtistRoutes();
}