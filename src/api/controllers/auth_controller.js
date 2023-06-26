import authService from "../services/auth_service.js";
import { AccessDeniedError } from "../errors/auth_errors.js";

export async function login(req, res) {
    const credentials = req.body;

    try{
        const token = await authService.login(credentials);
        return res.json({token}).end();

    }
    catch(err){
        if(err instanceof AccessDeniedError){
            return res.status(err.status).json(err.body).end();
        }

        return res.status(500).end();

    }

}

export function validateToken(req, res) {
    const token = req.body.token;

    try{
        const tokenData = authService.validateToken(token);
        console.log(tokenData);
        
        const body = {
            id: tokenData.id,
            name: tokenData.name,
            type: tokenData.type
        }
    
        res.json(body);
    }
    catch(err){
        if(err instanceof AccessDeniedError){
            return res.status(err.status).json(err.body).end();
        }

        return res.status(500).end();
    }

}