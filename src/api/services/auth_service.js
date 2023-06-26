import jwt from "jsonwebtoken";
import userService from './user_service.js';
import { AccessDeniedError } from "../errors/auth_errors.js";

const TOKEN_SECRET = process.env.TOKEN_SECRET;

async function login(credentials) {
    const user = await userService.getAllUsers(credentials);

    if (user.length === 0) {
        throw new AccessDeniedError();
    }
    
    const tokenPayload = {
        id: user[0].id,
        name: user[0].name,
        email: user[0].email,
        type: 'user'
    };

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