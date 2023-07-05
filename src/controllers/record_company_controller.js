import userService from "../services/user_service.js";
import {
    createRecordCompany,
    getRecordCompany,
    getRecordCompanyTopArtists,
    getRecordCompanyArtists,
    searchArtists,
    addArtist
} from "../services/record_company_service.js";
import { getFileAsByte} from '../services/image_service.js';

export function getRecordCompanyLoginPage(req, res) {
    res.render('gravadora_login');
}

export function getRecordCompanySigninPage(req, res) {
    res.render('gravadora_signin');
}

export async function postRecordCompany(req, res) {
    const recordCompanyPicture = await getFileAsByte(req.file.path);

    const recordCompany = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        recordCompanyPicture: recordCompanyPicture
    }

    try {
        await createRecordCompany(recordCompany);
    } catch (err) {
        console.log(err.message);
        return;
    }
    res.render('gravadora_signin', { recordCompanyCreated: true });
}

export async function getRecordCompanyIndexPage(req, res) {
    if (req.credentials && req.credentials.type === 'recordCompany') {
        const recordCompanyId = req.credentials.id;
        
        const recordCompany = await getRecordCompany(recordCompanyId);
    
        if (recordCompany) {
            const topArtists = await getRecordCompanyTopArtists(recordCompanyId);
            const renderData= {
                statsPage: true, 
                recordCompany: recordCompany,
                topArtists: topArtists
            };
            res.render('gravadora_home', renderData);
            return;
        }
        res.render('gravadora_home');
        //res.render('index_gravadora');
    }
    else res.render('index_gravadora');

}

export async function performRecordCompanyLogin(req, res) {
    const { email, password } = req.body;

    const token = await userService.login(email, password);

    if (!token || token.type === 'user' || token.type === 'artist') {
        res.render('gravadora_login', { loginFailed: true });
        return;
    }

    res.cookie('token', token);

    res.redirect('/record');
}

export async function getArtistsAddPage(req, res){
    if(req.credentials && req.credentials.type === 'recordCompany'){
        const recordCompanyId = req.credentials.id;
        const recordCompany = await getRecordCompany(recordCompanyId);

        res.render('gravadora_add', { addPage: true, recordCompany: recordCompany});
    }
}

export async function getArtistsAddPageArtists(req, res) {
    if(req.credentials && req.credentials.type === 'recordCompany'){
        const recordCompanyId = req.credentials.id;
        const recordCompany = await getRecordCompany(recordCompanyId);
        const artists = await searchArtists(req.body.name);
        res.render('gravadora_add', { addPage: true, recordCompany: recordCompany, artists: artists});
    }
}
export async function getRecordCompanyArtistsPage(req, res) {
    if(req.credentials && req.credentials.type === 'recordCompany'){
        const recordCompanyId = req.credentials.id;
        const recordCompany = await getRecordCompany(recordCompanyId);
        const artists = await getRecordCompanyArtists(recordCompanyId);

        res.render('gravadora_artists', { artistsPage: true, recordCompany: recordCompany, artists: artists });
    }
}

export async function addArtistToRecordCompany(req, res) {
    if(req.credentials && req.credentials.type === 'recordCompany'){
        const recordCompanyId = req.credentials.id;
        const artistId = parseInt(req.params.artistId);

        await addArtist(artistId, recordCompanyId);

        res.redirect('/record/artists');
    }
}

export async function getConfigPage(req, res) {
    if(req.credentials && req.credentials.type === 'recordCompany'){
        const recordCompanyId = req.credentials.id;
        const recordCompany = await getRecordCompany(recordCompanyId);

        res.render('gravadora_config', { recordCompany: recordCompany});
    }   
}