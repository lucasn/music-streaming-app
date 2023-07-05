import { app } from '../configs/server.js';
import { 
    getRecordCompanyIndexPage,
    getRecordCompanyLoginPage,
    getRecordCompanySigninPage,
    postRecordCompany,
    performRecordCompanyLogin,
    getArtistsAddPage,
    getRecordCompanyArtistsPage,
    getArtistsAddPageArtists,
    addArtistToRecordCompany,
    getConfigPage
} from '../controllers/record_company_controller.js';
import multer from 'multer'

let upload = multer({ dest:'uploads/' });

export default function configureRecordCompanyRoutes() {
    app.get('/record', getRecordCompanyIndexPage);
    app.get('/record/login', getRecordCompanyLoginPage);
    app.post('/record/login', performRecordCompanyLogin);
    app.get('/record/signin', getRecordCompanySigninPage);
    app.post('/record/', upload.single('recordCompanyPicture'), postRecordCompany);
    app.get('/record/add', getArtistsAddPage)
    app.post('/record/add/search', getArtistsAddPageArtists);
    app.get('/record/add/:artistId', addArtistToRecordCompany);
    app.get('/record/artists', getRecordCompanyArtistsPage);
    app.get('/record/configs', getConfigPage);
}