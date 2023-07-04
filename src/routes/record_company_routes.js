import { app } from '../configs/server.js';
import { 
    getRecordCompanyIndexPage,
    getRecordCompanyLoginPage,
    getRecordCompanySigninPage,
    performRecordCompanyLogin,
    getRecordCompanyArtistsPage
} from '../controllers/record_company_controller.js';

export default function configureRecordCompanyRoutes() {
    app.get('/record', getRecordCompanyIndexPage);
    app.get('/record/login', getRecordCompanyLoginPage);
    app.post('/record/login', performRecordCompanyLogin);
    app.get('/record/signin', getRecordCompanySigninPage);
    app.get('/record/artists', getRecordCompanyArtistsPage);
}