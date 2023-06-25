import { app } from '../configs/server.js';
import {
    login,
    validateToken
} from '../controllers/auth_controller.js';

export default function configureAuthRoutes() {
    app.post('/login', login);
    app.post('/token/validate', validateToken);
}