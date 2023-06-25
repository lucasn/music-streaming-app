import playlistService from "../services/playlist_service.js";

export async function getSongsFromPlaylist(req, res, next) {
    const playlistId = parseInt(req.params.playlistId);

    if (playlistId) {
        try {
            const playlist = await playlistService.getSongsFromPlaylist(playlistId);

            if (playlist) {
                return res.status(200).json(playlist).end();
            }
        }
        catch (err) {
            return res.status(err.status).json(err).end();
        }
    }
}

export async function createPlaylist(req, res, next) {
    const playlistTitle = req.body.title;
    const authorId = parseInt(req.body.authorId);

    if (playlistTitle && authorId) {
        const playlistCreated = await playlistService.createPlaylist(playlistTitle, authorId);
        return res.status(201).json(playlistCreated);
    } else {
        return res.status(400).json({ error: "authorId or playlistTitle not included" }).end();
    }
}

export async function deletePlaylist(req, res, next) {
    const playlistId = parseInt(req.params.playlistId);

    if (playlistId) {
        const deletedPlaylist = await playlistService.deletePlaylist(playlistId);
        if (deletedPlaylist) {
            return res.status(200).end();
        } else {
            return res.status(404).json({ error: `Playlist com id igual a ${playlistId} não encontrada` }).end();
        }
    }

    return res.status(400).json({ error: "playlistId não fornecido" }).end();
}

export async function modifyPlaylist(req, res, next) {
    const action = req.body.action;
    const playlistId = parseInt(req.body.playlistId);
    let updatedPlaylist;

    if (playlistId) {
        if (action === 'add' || action === 'remove') {
            const songId = parseInt(req.body.songId);

            if (songId) {
                if (action === 'add') {
                    updatedPlaylist = await playlistService.addSongToPlaylist(songId, playlistId);
                }
                else if (action === 'remove') {
                    updatedPlaylist = await playlistService.removeSongFromPlaylist(songId, playlistId);
                }

                if (updatedPlaylist) {
                    return res.status(200).json(updatedPlaylist).end();
                } else {
                    return res.status(500).json({ error: "Algo deu errado" }).end();
                }
            }

            else if (!songId) {
                return res.status(400).json({ error: "songId não fornecida" }).end();
            }
        }

        else if (action === 'rename') {
            const newTitle = req.body.newTitle;

            if (newTitle) {
                updatedPlaylist = await playlistService.renamePlaylist(newTitle, playlistId);

                if (updatedPlaylist) {
                    return res.status(200).json(updatedPlaylist).end();
                }
                else {
                    return res.status(500).json({ error: "Algo deu errado" }).end();
                }
            }
            else {
                return res.status(400).json({ error: "newTitle não fornecido" }).end();
            }
        }
    }
    else {
        return res.status(400).json({ error: "playlistId não fornecida" }).end();
    }
}