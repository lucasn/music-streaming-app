import jwt from "jsonwebtoken";
import userService from './user_service.js';
import artistService from './artist_service.js';
import recordCompanyService from "./record_company_service.js";
import { AccessDeniedError } from "../errors/errors.js";

const TOKEN_SECRET = process.env.TOKEN_SECRET;

async function login(credentials) {
    const user = await userService.getAllUsers(credentials);

    let tokenPayload;
    if (user.length === 0) {
        const artist = await artistService.getAllArtists(credentials);

        if (artist.length === 0) {
            const recordCompany = await recordCompanyService.getAllRecordCompanies(credentials);
            
            if(recordCompany.length === 0){
                throw new AccessDeniedError();
            }

            tokenPayload = {
                id: recordCompany[0].id,
                name: recordCompany[0].name,
                email: recordCompany[0].email,
                type: 'recordCompany'
            };
        }
        else{
            tokenPayload = {
                id: artist[0].id,
                name: artist[0].name,
                email: artist[0].email,
                type: 'artist'
            };
        }
    } 
    else {
        tokenPayload = {
            id: user[0].id,
            name: user[0].name,
            email: user[0].email,
            type: 'user'
        };
    }
    
    const token = jwt.sign(tokenPayload, TOKEN_SECRET);
    
    return token;
}

function validateToken(token) {
    try {
        const tokenData = jwt.verify(token, TOKEN_SECRET);
        return tokenData;
    }
    catch (err) {
        throw new AccessDeniedError();
    }
}

const authService = {
    login,
    validateToken
};

export default authService;