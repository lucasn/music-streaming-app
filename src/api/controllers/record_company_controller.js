import recordCompanyService from "../services/record_company_service.js"; 
import { NotFoundError, ConflictError, InternalServerError } from "../errors/errors.js";
import { base64ToBytes, bytesToBase64 } from '../utils/utils.js';

export async function createRecordCompany(req, res, next) {
    try {
        const recordCompany = {
            email: req.body.email,
            name: req.body.name,
            password: req.body.password,
            recordCompanyPicture: base64ToBytes(req.body.recordCompanyPicture)
        };
        const createdRecordCompany = await recordCompanyService.createRecordCompany(recordCompany);

        res.status(201).json(createdRecordCompany);
    }
    catch (err) {
        if(err instanceof ConflictError || err instanceof InternalServerError)
            return res.status(err.status).json(err.body).end();
        
        return res.status(500).json({status: 500, message: "Something gone wrong"}).end();
    }
}

export async function deleteRecordCompany(req, res, next) {
    const recordCompanyId = parseInt(req.params.recordCompanyId);
    
    try{
        const deletedRecordCompany = await recordCompanyService.deleteRecordCompany(recordCompanyId);
        return res.status(200).json(deletedRecordCompany);
    }
    catch(err) {
        if(err instanceof NotFoundError || err instanceof InternalServerError)
            return res.status(err.status).json(err.body).end();
        
        return res.status(500).json({status: 500, message: "Something gone wrong"}).end();
    }
}

export async function getAllRecordCompanies(req, res, next) {
    const filters = {
        email: req.query.email,
        name: req.query.name,
        password: req.query.password
    }
    const recordCompanies = await recordCompanyService.getAllRecordCompanies(filters);
    
    recordCompanies.forEach(recordCompany => {
        if(recordCompany.recordCompanyPicture)
            recordCompany.recordCompanyPicture = bytesToBase64(recordCompany.recordCompanyPicture);
    })
    return res.status(200).json(recordCompanies);
}

export async function getRecordCompany(req, res, next) {
    const recordCompanyId = parseInt(req.params.recordCompanyId);
    
    try {
        const recordCompany = await recordCompanyService.getRecordCompany(recordCompanyId);

        if(recordCompany.recordCompanyPicture){
            recordCompany.recordCompanyPicture = bytesToBase64(recordCompany.recordCompanyPicture);
        }
        return res.status(200).json(recordCompany);
    } 
    catch (err) {
        if(err instanceof NotFoundError || err instanceof InternalServerError)
            return res.status(err.status).json(err.body).end();
    
        return res.status(500).json({status: 500, message: "Something gone wrong"}).end();
    }
}

export async function getRecordCompanyArtists(req, res, next) {
    const recordCompanyId = parseInt(req.params.recordCompanyId);

    if (recordCompanyId) {
        try {
            const recordCompanyArtists = await recordCompanyService.getRecordCompanyArtists(recordCompanyId);

            recordCompanyArtists.artists.forEach(artist => {
                if(artist.profilePicture)
                    artist.profilePicture = bytesToBase64(artist.profilePicture);
            })
            return res.status(200).json(recordCompanyArtists).end();
        }
        catch (err) {
            return res.status(err.status).json(err).end();
        }

    }
}