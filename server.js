import express from "express";

const app = express();

const port = 8080;

app.use(express.static('public'));
app.set('view engine', 'ejs');


app.get('/:user', (req, res) => {

    const user = req.params.user === 'user' ? true : false;
    res.render('index', {user: user});
})

app.listen(port, () => console.log(`Server is running on port ${port}`));