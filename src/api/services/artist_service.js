import prisma from "../configs/database.js"

async function createArtist(artist) {
    try{
        const createdArtist = await prisma.artist.create({
            data: artist
        });
    
        return createdArtist;
    }
    catch(err){
        throw {
            status: 409, // CONFLICT
            message: `Artist with this ${err.meta.target[0]} already exists` 
        }
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
        console.log(err);
    }
}

export async function getAllArtists(filters) {
    const artists = await prisma.artist.findMany({
        where: {...filters}
    });

    return artists;
}

const artistService = {
    createArtist,
    getArtist,
    getAllArtists
};

export default artistService;