import songService from "../services/song_service.js";
import { Readable } from "stream";

export async function getSong(req, res, next) {
    const songId = parseInt(req.params.songId);

    try {
        const song = await songService.getSong(songId);

        if (song.album.cover){
            song.album.cover = song.album.cover.toString('base64');
        }

        return res.status(200).json(song);
    }
    catch (err) {
        return res.status(err.status).json(err).end();
    }
}

export async function getAllSongs(req, res, next){
    const filters = {
        album: {
            id: req.query.album_id ? parseInt(req.query.album_id) : undefined,
            artist: {
                id: req.query.artist_id ? parseInt(req.query.artist_id) : undefined
            }
        }
    };

    const top = req.query.top ? parseInt(req.query.top) : undefined;

    const orderByPlays = req.query.order_by_plays ? "desc" : undefined
    const songs = await songService.getAllSongs(filters, top, orderByPlays);

    songs.forEach(song => {
        if(song.album.cover){
            song.album.cover = song.album.cover.toString('base64');
        }
    })
    return res.status(200).json(songs).end();
}

export async function getSongAudio(req, res, next) {
    const songId = parseInt(req.params.songId);

    try {
        const songAudio = await songService.getSongAudio(songId);

        const stream = new Readable({
            read() {
                this.push(songAudio.audioFile);
                this.push(null);
            }
        });

        return stream.pipe(res);
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