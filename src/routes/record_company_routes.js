import { app } from '../configs/server.js';
import { 
    getRecordCompanyIndexPage,
    getRecordCompanyLoginPage,
    getRecordCompanySigninPage,
    performRecordCompanyLogin,
    getArtistsAddPage,
    getRecordCompanyArtistsPage,
    getArtistsAddPageArtists,
    addArtistToRecordCompany
} from '../controllers/record_company_controller.js';

export default function configureRecordCompanyRoutes() {
    app.get('/record', getRecordCompanyIndexPage);
    app.get('/record/login', getRecordCompanyLoginPage);
    app.post('/record/login', performRecordCompanyLogin);
    app.get('/record/signin', getRecordCompanySigninPage);
    app.get('/record/add', getArtistsAddPage)
    app.post('/record/add/search', getArtistsAddPageArtists);
    app.get('/record/add/:artistId', addArtistToRecordCompany);
    app.get('/record/artists', getRecordCompanyArtistsPage);
}