import express from "express";
import nunjucks from "nunjucks";

const app = express();
const PORT = 8080;
const HOST = '127.0.0.1';

nunjucks.configure('src/views', {
    autoescape: true,
    express: app
});

app.use(express.static('public'));
app.set('view engine', 'njk');

app.use(corsMiddleware);

function corsMiddleware(req, res, next) {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': '*'
    });
    next();
}

function startServer() {
    app.listen(PORT, HOST, () => console.log(`Server is running on port ${PORT}`));
}

export {app, PORT, startServer};