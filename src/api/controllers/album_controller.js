import albumService from "../services/album_service.js";
import { NotFoundError, InternalServerError } from "../errors/errors.js";
import { base64FromBytes, bytesFromBase64 } from "../utils/utils.js";

export async function createAlbum(req, res, next){
    const album = {
        name: req.body.name,
        year: parseInt(req.body.year),
        cover: bytesFromBase64(req.body.cover),
        artistId: parseInt(req.body.artistId)
    };

    const createdAlbum = await albumService.createAlbum(album);

    if(createdAlbum)
        return res.status(201).json(createdAlbum);
    
    return res.status(500);
}

export async function getAlbum(req, res, next){
    const albumId = parseInt(req.params.albumId);
    
    let includeSongs;
    if(req.query.include_songs)
        includeSongs = (req.query.include_songs.toLowerCase() === 'true');
    else
        includeSongs = false;

    try {
        const album = await albumService.getAlbum(albumId, includeSongs);
        album.cover = base64FromBytes(album.cover);

        return res.status(200).json(album).end();
    } catch (err) {
        if(err instanceof NotFoundError || err instanceof InternalServerError)
            return res.status(err.status).json(err.body).end();
        
        const error = new InternalServerError();
        return res.status(error.status).json(error.body)
    }
}

export async function getAlbumCover(req, res, next) {
    const albumId = parseInt(req.params.albumId);

    try {
        const album = await albumService.getAlbumCover(albumId);
        album.cover = base64FromBytes(album.cover);

        return res.status(200).json(album).end();
    } 
    catch (err) {
        if(err instanceof NotFoundError || err instanceof InternalServerError)
            return res.status(err.status).json(err.body).end();

        const error = new InternalServerError();
        return res.status(error.status).json(error.body)
    }
    
}

export async function getAllAlbums(req, res, next) {
    const filters = {
        name: {
            contains: req.query.name
        },
        artist: {
            id: req.query.artist_id ? parseInt(req.query.artist_id) : undefined
        }
    };

    const albums = await albumService.getAllAlbums(filters);

    albums.forEach(album => {
        album.cover = base64FromBytes(album.cover);
    })

    return res.json(albums);
}