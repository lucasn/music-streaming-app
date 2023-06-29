import express from "express";
import nunjucks from "nunjucks";
import cookieParser from "cookie-parser";
import corsMiddleware from "../middlewares/cors_middleware.js";
import authenticationMiddleware from "../middlewares/auth_middleware.js";

const app = express();
const PORT = 8080;
const HOST = '127.0.0.1';
const apiBaseURL = 'http://localhost:8081';

nunjucks.configure('src/views', {
    autoescape: true,
    express: app
});

app.set('view engine', 'njk');

app.use(cookieParser());
app.use(express.static('public'));
app.use(corsMiddleware);
app.use(authenticationMiddleware);
app.use(express.urlencoded({extended: true}));
app.use(express.json());

function startServer() {
    app.listen(PORT, HOST, () => console.log(`Server is running on port ${PORT}`));
}

export {app, PORT, startServer, apiBaseURL};