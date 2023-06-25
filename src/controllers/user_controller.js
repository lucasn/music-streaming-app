import { 
    getUserPlaylists, 
    getSongsFromPlaylist, 
    createUser as createUserInDatabase,
    getUserByEmail,
    getUserById,
    createPlaylist as createPlaylistInDatabase,
    getSongsByName,
    deletePlaylistById,
    addSongToPlaylistById,
    removeSongFromPlaylistById,
    retrieveSong,
    retrieveSongFile
} from "../services/music_service.js";


export async function getIndexPage(req, res) {

    const userId = parseInt(req.cookies.user_id);

    if (userId) {
        const user = await getUserById(userId);

        if (user) {
            
            const playlists = await getUserPlaylists(userId);

            res.render('index_user', {playlists: playlists, user: user});
            return;
        }
    }

    res.render('index');
}

export function getSigninPage(req, res) {
    res.render('signin', {userCreated: false});
}

export function getLoginPage(req, res) {
    res.render('login');
}

export async function getHomePage(req, res) {
    const userId = parseInt(req.params.user_id);

    const user = await getUserById(userId);

    res.render('index', {playlists: await getUserPlaylists(userId), user: user});
}

export async function performLogin(req, res) {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);

    if (user.length === 0 || user[0].password !== password) {
        res.redirect('/');
        return;
    }

    res.cookie('user_id', user[0].id);

    res.redirect('/');
}



export async function getPlaylistById(req, res) {
    const playlistId = parseInt(req.params.playlist_id);

    const playlist = await getSongsFromPlaylist(playlistId);

    res.render('components/playlists_content', {playlist: playlist});
}

export function getHomeContent(req, res) {
    res.render('home');
}

export async function createUser(req, res) {
    try {
        const user = req.body;
        await createUserInDatabase(user);
    }
    catch (err) {
        console.log(err.message);
        res.render('error');
        return;
    }

    res.render('signin', {userCreated: true});
}

export async function createPlaylist(req, res) {
    const userId = parseInt(req.params.userId);
    const playlistName = req.body.playlist_name;

    let user = await getUserById(userId);

    if (user) {
        await createPlaylistInDatabase(userId, playlistName);
        const playlists = await getUserPlaylists(userId);
        res.render('partials/playlists_cards', {playlists: playlists});
        return;
    }

    res.render('error');
}

export async function searchSongs(req, res) {
    const searchString = req.query.search_string;

    if (!searchString) {
        return res.json([]);
    }

    const songs = await getSongsByName(searchString);

    res.json(songs);
}

export async function deletePlaylist(req, res) {
    const playlistId = parseInt(req.params.playlistId);

    await deletePlaylistById(playlistId);

    res.status(204).end();
}

export async function getPlaylistsByUserId(req, res) {
    const userId = parseInt(req.params.user_id);

    const playlists = await getUserPlaylists(userId);

    res.render('partials/playlists_cards', {playlists: playlists});
}

export async function searchPlaylistsByUserId(req, res) {
    const userId = parseInt(req.params.user_id);

    const playlists = await getUserPlaylists(userId);

    res.json(playlists);
}

export async function addSongToPlaylist(req, res) {
    const songId = req.body.songId;
    const playlistId = req.body.playlistId;
    
    await addSongToPlaylistById(songId, playlistId);

    return res.status(200).end();
}

export async function removeSongFromPlaylist(req, res) {
    const songId = req.body.songId;
    const playlistId = req.body.playlistId;

    await removeSongFromPlaylistById(playlistId, songId);

    res.status(200).end();
}

export async function getSongInfo(req, res) {
    const songId = parseInt(req.params.song_id);

    const song = await retrieveSong(songId);

    return res.json(song);
}

export async function getSongFile(req, res) {
    const songId = parseInt(req.params.song_id);
    const file = await retrieveSongFile(songId);

    return res.end(file);
}