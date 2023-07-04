import userService from "../services/user_service.js";
import { 
    getRecordCompany,
    getRecordCompanyArtists
} from "../services/record_company_service.js";

export function getRecordCompanyLoginPage(req, res) {
    res.render('gravadora_login');
}

export function getRecordCompanySigninPage(req, res) {
    res.render('gravadora_signin');
}

export async function getRecordCompanyIndexPage(req, res) {
    if (req.credentials && req.credentials.type === 'recordCompany') {
        const recordCompanyId = req.credentials.id;
        
        const recordCompany = await getRecordCompany(recordCompanyId);
    
        if (recordCompany) {
            // const topSongs = await getArtistTopSongs(artistId);
            const renderData= {
                statsPage: true, 
                recordCompany: recordCompany
                // topSongs: topSongs,
                // audience: getArtistAudience(artistId)
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

export async function getRecordCompanyArtistsPage(req, res) {
    if(req.credentials && req.credentials.type === 'recordCompany'){
        const recordCompanyId = req.credentials.id;
        const recordCompany = await getRecordCompany(recordCompanyId);
        const artists = await getRecordCompanyArtists(recordCompanyId);

        res.render('gravadora_artists', { artistsPage: true, recordCompany: recordCompany, artists: artists });
    }
}