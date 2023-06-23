import userService from "../services/user_service.js";

export async function createUser(req, res, next) {
    const user = req.body;
    const createdUser = await userService.createUser(user);

    res.status(201).json(createdUser);
}

export async function getAllUsers(req, res, next) {
    const filters = {
        email: req.query.email,
        name: req.query.name,
        password: req.query.password
    };
    const users = await userService.getAllUsers(filters);

    return res.json(users);
}

export async function getUser(req, res, next) {
    const userId = parseInt(req.params.userId);
    const user = await userService.getUser(userId);

    return user ? res.status(200).json(user) : res.status(404).end();
}

export async function createPlaylist(req, res, next){
    const playlistTitle = req.body.title;
    const authorId = parseInt(req.body.authorId);

    if(playlistTitle && authorId){
        const playlistCreated = await userService.createPlaylist(playlistTitle, authorId);
        return res.status(201).json(playlistCreated);
    } else {
        return res.status(400).json({error: "authorId or playlistTitle not included"}).end();
    }
}

export async function deletePlaylist(req, res, next){
    const playlistId = parseInt(req.body.playlistId);

    if(playlistId){
        const deletedPlaylist = await userService.deletePlaylist(playlistId);
        if(deletedPlaylist){
            return res.status(200).end();
        } else {
            return res.status(404).json({error: `Playlist com id igual a ${playlistId} não encontrada`}).end();
        }
    }

    return res.status(400).json({error: "playlistId não fornecido"}).end();
}

export async function modifyPlaylist(req, res, next) {
    //TODO: transformar função para adicionar ou excluir músicas da playlist
    const songId = parseInt(req.body.songId);
    const playlistId = parseInt(req.body.playlistId);
    
    if(songId && playlistId){
        const updatedPlaylist = await userService.addSongToPlaylist(songId, playlistId);

        if(updatedPlaylist){
            return res.status(200).json(updatedPlaylist).end();
        } else {
            return res.status(500).json({error: "Algo deu errado"}).end();
        }
    } else if(!songId && !playlistId) {
        return res.status(400).json({error: "songId e playlistId não fornecidas"}).end();
    } else {
        if(!songId) {
            return res.status(400).json({error: "songId não fornecida"}).end();
        } else if(!playlistId) {
            return res.status(400).json({error: "playlistId não fornecida"}).end();
        }
    }

}