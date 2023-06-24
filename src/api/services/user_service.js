import prisma from "../configs/database.js"

async function createUser(user) {
    const createdUser = await prisma.user.create({
        data: {
            ...user,
            playlists: {
                create: {
                    title: 'Músicas Curtidas'
                }
            }
        }
    });

    return createdUser;
}

async function getUser(userId) {
    const user = await prisma.user.findUnique({
        where: {id: userId}
    });

    return user;
}

async function getAllUsers(filters) {
    const users = await prisma.user.findMany({
        where: {...filters}
    });

    return users;
}

async function getUserPlaylists(userId){
    let user;

    try{
        user = await prisma.user.findUniqueOrThrow({
            where: {
                id: userId
            }
        });
    } catch(err) {
        throw {
            status: 404,
            message: `User with id ${userId} not found`
        }
    }
    
    const playlists = await prisma.playlist.findMany({
        where: {
            author: user
        }
    });

    return playlists;
}

async function getSongsFromPlaylist(playlistId){
    try{
        const playlist = await prisma.playlist.findUniqueOrThrow({
            where: {
                id: playlistId
            },
            select: {
                id: true,
                title: true,
                songs: {
                    select: {
                        id: true,
                        title: true,
                        album: {
                            select: {
                                name: true,
                                artist: {
                                    select: {
                                        name: true
                                    }
                                },
                                cover: true
                            }
                        }
                    }
                }
            }
        });
    
        playlist.songs.forEach(song => {
            if (song.album.cover) {
                song.album.cover = song.album.cover.toString('base64');
            }
        })
    
        return playlist;
    }
    catch(err){
        throw {
            status: 404,
            message: `Playlist with id ${playlistId} not found`
        }
    }
}

async function createPlaylist(playlistTitle, authorId){
    const playlist = await prisma.playlist.create({
        data: {
            title: playlistTitle,
            authorId: authorId
        }
    });

    return playlist;
}

async function deletePlaylist(playlistId){
    try {
        const deletedPlaylist = await prisma.playlist.delete({
            where: {id: playlistId}
        });
    
        return deletedPlaylist;
    } catch(err) {
        return null;
    }
}

async function addSongToPlaylist(songId, playlistId) {
    const updatedPlaylist = await prisma.playlist.update({
        where: {
            id: playlistId
        },
        data: {
            songs: {
                connect: {
                    id: songId
                }
            }
        }
    });

    return updatedPlaylist;
}

async function removeSongFromPlaylist(songId, playlistId){
    const updatedPlaylist = await prisma.playlist.update({
        where: {
            id: playlistId
        },
        data: {
            songs: {
                disconnect:{
                    id: songId
                }
            }
        }
    });

    return updatedPlaylist;
}

async function renamePlaylist(newTitle, playlistId){
    const updatedPlaylist = await prisma.playlist.update({
        where: {
            id: playlistId
        },
        data: {
            title: newTitle
        }
    });

    return updatedPlaylist;
}

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

const userService = {
    createUser,
    getUser,
    getAllUsers,
    getUserPlaylists,
    getSongsFromPlaylist,
    createPlaylist,
    deletePlaylist,
    addSongToPlaylist,
    removeSongFromPlaylist, 
    renamePlaylist,
    getSong, 
    getSongAudio, 
    searchSongs
};
export default userService;