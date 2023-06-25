import prisma from "../configs/database.js"

async function getSong(songId){
    try{
        const song = await prisma.song.findUniqueOrThrow({
            where: {
                id: songId
            },
            select: {
                title: true,
                id: true,
                plays: true,
                album: {
                    select: {
                        name: true,
                        cover: true,
                        artist: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    }
                }
            }
        });

        return song;
    }
    catch (err) {
        throw {
            status: 404,
            message: `Song with id ${songId} not found`
        };
    }
}

async function getAllSongs(filters, top, orderByPlays){
    //TODO: separar funções de pegar músicas e pegar as mais ouvidas
    const songs = await prisma.song.findMany({
        where: {...filters},
        select: {
            title: true,
            id: true,
            plays: true,
            album: {
                select: {
                    name: true,
                    cover: true,
                    artist: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            }
        },
        orderBy: {
            plays: orderByPlays
        },
        take: top
    })

    return songs;
}

async function getSongAudio(songId) {
    try{
        const songFile = await prisma.song.findUniqueOrThrow({
            where: {
                id: songId
            },
            select: {
                audioFile: true
            }
        });
    
        return songFile.audioFile.toString('base64');
    }
    catch(err){
        throw {
            status: 404,
            message: `Song with id ${songId} not found`
        };
    }
}

async function searchSongs(songNameContains){
    const songs = await prisma.song.findMany({
        where: {
            title: {
                contains: songNameContains
            }
        },
        select: {
            id: true,
            title: true,
            album: {
                select: {
                    id: true,
                    name: true,
                    artist: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            }
        }
    });

    return songs;
}

const songService = {
    getSong,
    getAllSongs,
    getSongAudio, 
    searchSongs
};
export default songService;