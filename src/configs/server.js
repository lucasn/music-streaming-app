import express from "express";
import nunjucks from "nunjucks";

const app = express();
const PORT = 8081;

nunjucks.configure('src/views', {
    autoescape: true,
    express: app
});

app.use(express.static('public'));
app.set('view engine', 'njk');

function startServer() {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}

export {app, PORT, startServer};