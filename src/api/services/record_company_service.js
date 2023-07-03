import prisma from "../configs/database.js"
import { NotFoundError, ConflictError, InternalServerError } from "../errors/errors.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";

async function createRecordCompany(recordCompany) {
    try {
        const createdRecordCompany = await prisma.recordCompany.create({
            data: recordCompany,
            select: {
                id: true,
                name: true, 
                email: true
            }
        });
    
        return createdRecordCompany;    
    } 
    catch (err) {
        if(err instanceof PrismaClientKnownRequestError && err.code === 'P2002')
            throw new ConflictError(`Record Company with ${err.meta.target[0]} ${recordCompany[err.meta.target[0]]} already exists`);
        
        throw new InternalServerError();
    }
}

async function deleteRecordCompany(recordCompanyId) {
    try {
        const deletedRecordCompany = await prisma.recordCompany.delete({
            where: {
                id: recordCompanyId
            },
            select: {
                id: true,
                email: true,
                name: true,
                artists: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });
    
        return deletedRecordCompany;    
    } 
    catch (err) {
        if(err instanceof PrismaClientKnownRequestError && err.code === 'P2025')
            throw new NotFoundError(`Record Company with id ${recordCompanyId} not found`);
        
        throw new InternalServerError();
    }
}

async function getRecordCompany(recordCompanyId) {
    try {
        const recordCompany = await prisma.recordCompany.findUniqueOrThrow({
            where: {id: recordCompanyId},
            select: {
                id: true,
                name: true,
                recordCompanyPicture: true
            }
        });
    
        return recordCompany;    
    } 
    catch (err) {
        if(err instanceof PrismaClientKnownRequestError && err.code === 'P2025')
            throw new NotFoundError(`Record Company with id ${recordCompanyId} not found`);
        
            throw new InternalServerError;
    }
}

async function getAllRecordCompanies(filters) {
    const recordCompanies = await prisma.recordCompany.findMany({
        where: {...filters}
    });

    return recordCompanies;
}

async function getRecordCompanyArtists(recordCompanyId){
    let user;

    try {
        const recordCompanyArtists = await prisma.recordCompany.findUniqueOrThrow({
            where: {
                id: recordCompanyId
            },
            select: {
                artists: {
                    select: {
                        id: true,
                        name: true,
                        profilePicture: true
                    }
                }
            }
        });
        
        return recordCompanyArtists
    } 
    catch (err) {
        if(err instanceof PrismaClientKnownRequestError && err.code === 'P2025')
            throw new NotFoundError(`Record Company with id ${recordCompanyId} not found`);
        
        throw new InternalServerError();
    }
}

const recordCompanyService = {
    createRecordCompany,
    deleteRecordCompany,
    getRecordCompany,
    getAllRecordCompanies,
    getRecordCompanyArtists
};
export default recordCompanyService;