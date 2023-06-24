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
    
        if (song.album.cover){
            song.album.cover = song.album.cover.toString('base64');
        }

        return song;
    }
    catch (err) {
        throw {
            status: 404,
            message: `Song with id ${songId} not found`
        };
    }
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
    getSongAudio, 
    searchSongs
};
export default songService;