import userService from "../services/user_service.js";
import { NotFoundError, ConflictError, InternalServerError } from "../errors/errors.js";

export async function createUser(req, res, next) {
    try {
        const user = req.body;
        const createdUser = await userService.createUser(user);

        res.status(201).json(createdUser);
    }
    catch (err) {
        if(err instanceof ConflictError || err instanceof InternalServerError)
            return res.status(err.status).json(err.body).end();
        
        return res.status(500).json({status: 500, message: "Something gone wrong"}).end();
    }
}

export async function deleteUser(req, res, next) {
    const userId = parseInt(req.params.userId);
    
    try{
        const deletedUser = await userService.deleteUser(userId);
        return res.status(200).json(deletedUser);
    }
    catch(err) {
        if(err instanceof NotFoundError || err instanceof InternalServerError)
            return res.status(err.status).json(err.body).end();
        
        return res.status(500).json({status: 500, message: "Something gone wrong"}).end();
    }
}

export async function getAllUsers(req, res, next) {
    const filters = {
        email: req.query.email,
        name: req.query.name,
        password: req.query.password
    };
    const users = await userService.getAllUsers(filters);
    
    return res.status(200).json(users);
}

export async function getUser(req, res, next) {
    const userId = parseInt(req.params.userId);
    
    try {
        const user = await userService.getUser(userId);
        return res.status(200).json(user);
    } 
    catch (err) {
        if(err instanceof NotFoundError || err instanceof InternalServerError)
            return res.status(err.status).json(err.body).end();
    
        return res.status(500).json({status: 500, message: "Something gone wrong"}).end();
    }
}

export async function getUserPlaylists(req, res, next) {
    const userId = parseInt(req.params.userId);
    const includeSongs = req.query.include_songs;

    if (userId) {
        try {
            const playlists = await userService.getUserPlaylists(userId, includeSongs);
            return res.status(200).json(playlists).end();
        }
        catch (err) {
            return res.status(err.status).json(err).end();
        }

    }
}