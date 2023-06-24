import songService from "../services/song_service.js";

export async function getSong(req, res, next) {
    const songId = parseInt(req.params.songId);

    try {
        const song = await songService.getSong(songId);
        return res.status(200).json(song);
    }
    catch (err) {
        return res.status(err.status).json(err).end();
    }
}

export async function getSongAudio(req, res, next) {
    const songId = parseInt(req.params.songId);

    try {
        const songAudio = await songService.getSongAudio(songId);

        return res.status(200).json({audio: songAudio});
    }
    catch (err) {
        return res.status(err.status).json(err).end();
    }
}

export async function searchSongs(req, res, next) {
    const searchString = req.query.search;

    if(searchString) {
        const songs = await songService.searchSongs(searchString);

        return res.status(200).json(songs);
    }
    else {
        const err = {
            status: 400,
            message: "No search string given"
        }
        return res.status(err.status).json(err).end();
    }
}