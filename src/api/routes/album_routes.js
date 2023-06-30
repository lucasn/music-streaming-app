import { app } from "../configs/server.js";
import {
    createAlbum,
    getAlbum,
    getAlbumCover,
    getAllAlbums
} from "../controllers/album_controller.js";

export default function configureAlbumRoutes(){
    app.post('/album', createAlbum);
    app.get('/album', getAllAlbums);
    app.get('/album/:albumId', getAlbum);
    app.get('/album/:albumId/cover', getAlbumCover);
}