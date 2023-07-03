import { app } from '../configs/server.js';
import { 
    createRecordCompany,
    deleteRecordCompany,
    getRecordCompany,
    getAllRecordCompanies,
    getRecordCompanyArtists
} from '../controllers/record_company_controller.js';
import authenticate from '../middlewares/auth_middleware.js';

export default function configureRecordCompanyRoutes() {
    app.post('/record', createRecordCompany);
    app.delete('/record/:recordCompanyId', deleteRecordCompany);
    app.get('/record', getAllRecordCompanies);
    app.get('/record/:recordCompanyId', getRecordCompany);
    app.get('/record/:recordCompanyId/artists', getRecordCompanyArtists);
}