import jwt from "jsonwebtoken";
import userService from './user_service.js';

const TOKEN_SECRET = process.env.TOKEN_SECRET;

async function login(credentials) {
    const user = await userService.getAllUsers(credentials);

    //TODO: melhorar tratamento de exceção
    if (user.length === 0) return null;
    
    const tokenPayload = {
        id: user[0].id,
        name: user[0].name,
        email: user[0].email
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
        return null;
    }
}

const authService = {
    login,
    validateToken
};

export default authService;