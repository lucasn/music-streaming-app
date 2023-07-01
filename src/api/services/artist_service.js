import prisma from "../configs/database.js"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";
import { NotFoundError, InternalServerError, ConflictError } from "../errors/errors.js";

async function createArtist(artist) {
    try{
        const createdArtist = await prisma.artist.create({
            data: artist
        });
    
        return createdArtist;
    }
    catch(err){
        if(err instanceof PrismaClientKnownRequestError && err.code === 'P2002')
            throw new ConflictError(`Artist with this ${err.meta.target[0]} already exists`)
        
        throw new InternalServerError();
    }
}

async function deleteArtist(artistId) {
    try {
        const artist = await prisma.artist.delete({
            where: {
                id: artistId
            },
            select: {
                id: true,
                name: true,
                albuns: {
                    select: {
                        id: true,
                        name: true,
                        year: true,
                        songs: {
                            select: {
                                id: true,
                                title: true,
                                plays: true
                            }
                        }
                    }
                }
            }
        });
        
        return artist;
    } 
    catch (err) {
        if(err instanceof PrismaClientKnownRequestError && err.code === 'P2025')
            throw new NotFoundError(`Artist with id ${artistId} not found`);
        
        throw new InternalServerError();
    }
}

async function getArtist(artistId) {
    try{
        const artist = await prisma.artist.findUniqueOrThrow({
            where: {
                id: artistId
            },
            select: {
                id: true,
                name: true,
                profilePicture: true
            }
        });
    
        return artist;
    }
    catch(err) {
        if(err.code === 'P2025'){
            throw {
                status: 404,
                message: `Artist with id ${artistId} not found`
            };
        }
    }
}

async function getAllArtists(filters) {
    const artists = await prisma.artist.findMany({
        where: {...filters}
    });

    return artists;
}


const artistService = {
    createArtist,
    deleteArtist,
    getArtist,
    getAllArtists,
};

export default artistService;