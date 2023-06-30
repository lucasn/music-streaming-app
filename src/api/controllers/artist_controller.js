import artistService from '../services/artist_service.js';
import { NotFoundError, ConflictError, InternalServerError } from '../errors/errors.js';
import { base64ToBytes, bytesToBase64 } from '../utils/utils.js';
export async function createArtist(req, res, next){
    const artist = {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        profilePicture: base64ToBytes(req.body.profilePicture)
    };

    try {
        const createdArtist = await artistService.createArtist(artist);
        createdArtist.profilePicture = bytesToBase64(createdArtist.profilePicture);
        
        return res.status(201).json(createdArtist).end();
    }
    catch(err) {
        if(err instanceof ConflictError || err instanceof InternalServerError)
            return res.status(err.status).json(err.body).end();

        return res.status(500).json({status: 500, message: "Something gone wrong"}).end();
    }
}

export async function deleteArtist(req, res, next){
    const artistId = parseInt(req.params.artistId);

    try {
        const artist = await artistService.deleteArtist(artistId);

        if(artist)
            return res.status(200).json(artist).end();
        else
            return res.status(500).end();
    } 
    catch (err) {
        if(err instanceof NotFoundError || err instanceof InternalServerError) 
            return res.status(err.status).json(err.body).end();
        
        return res.status(500).json({status: 500, message: "Something gone wrong"}).end();
    }
}

export async function getArtist(req, res, next) {
    const artistId = parseInt(req.params.artistId);

    try{
        const artist = await artistService.getArtist(artistId);

        if(artist.profilePicture){
            artist.profilePicture = bytesToBase64(artist.profilePicture);
        }

        return res.status(200).json(artist).end();
    }
    catch(err){
        return res.status(err.status).json(err);
    }
}

export async function getAllArtists(req, res, next) {
    const filters = {
        email: req.query.email,
        name: req.query.name,
        password: req.query.password
    }

    const artists = await artistService.getAllArtists(filters);

    if(artists) {
        artists.forEach(artist => {
            artist.profilePicture = bytesToBase64(artist.profilePicture);
        });
    }

    return res.status(200).json(artists).end();
}
