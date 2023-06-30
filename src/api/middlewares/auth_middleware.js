import authService from "../services/auth_service.js";
import { AccessDeniedError } from "../errors/errors.js";

export default async function authenticate(req, res, next) {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        res.status(401).json({message: 'Access denied'}).end();
        return;
    }

    const splittedHeader = authorizationHeader.split(' ');
    if (splittedHeader.length < 2) {
        res.status(401).json({message: 'Access denied'}).end();
        return;
    }
    const token = splittedHeader[1];
    try{
        const tokenData = authService.validateToken(token);
        req.credentials = tokenData;
        next();
    }

    catch(err) {
        if(err instanceof AccessDeniedError)
            return res.status(err.status).json(err.body).end();

        return res.status(500).end();
    }


}