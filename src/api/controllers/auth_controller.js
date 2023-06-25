import authService from "../services/auth_service.js";

export async function login(req, res) {
    const credentials = req.body;
    const token = await authService.login(credentials);

    if (!token) {
        res.status(401).end();
        return;
    }

    res.json({token});
}

export function validateToken(req, res) {
    const token = req.body.token;

    const tokenData = authService.validateToken(token);

    if (!tokenData) {
        res.status(401).end();
        return
    }

    const body = {
        id: tokenData.id,
        type: 'user',
        name: tokenData.name
    }

    res.json(body);
}