import { apiBaseURL } from "../configs/server.js";

export default async function authenticationMiddleware(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        next();
        return;
    }

    const response = await fetch(`${apiBaseURL}/token/validate`, {
        method: 'post',
        body: JSON.stringify({token}),
        headers: {'Content-Type': 'application/json'}
    });

    if (response.status === 401) {
        next();
        return;
    }
    const credentials = await response.json();

    req.credentials = credentials;
    req.token = token;
    next();
}