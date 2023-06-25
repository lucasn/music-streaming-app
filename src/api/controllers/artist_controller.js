import artistService from '../services/artist_service.js';

export async function createArtist(req, res, next){
    const artist = {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        profilePicture: Buffer.from(req.body.profilePicture, 'base64')
    };

    try {
        const createdArtist = await artistService.createArtist(artist);

        if(createdArtist.profilePicture){
            createdArtist.profilePicture = createdArtist.profilePicture.toString('base64');
        }
        
        return res.status(201).json(createdArtist).end();
    }
    catch(err) {
        return res.status(err.status).json(err).end();
    }
}

export async function getArtist(req, res, next) {
    const artistId = parseInt(req.params.artistId);

    try{
        const artist = await artistService.getArtist(artistId);

        if(artist.profilePicture){
            artist.profilePicture = artist.profilePicture.toString('base64');
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
            artist.profilePicture = artist.profilePicture.toString('base64');
        })
    }

    return res.status(200).json(artists).end();
}
