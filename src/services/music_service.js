import prisma from "../configs/database.js";

export async function getUserPlaylists(userId) {
    const playlists = await prisma.playlist.findMany({
        where: {
            authorId: userId
        },
        include: {
            songs: true
        }
    });

    return playlists;
}

export async function getSongsFromPlaylist(playlistId) {

    const playlist = await prisma.playlist.findUnique({
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
                    updatedAt: true,
                    albumId: true,
                    album: {
                        select: {
                            name: true,
                            artistId: true,
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

export async function createUser(user) {
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

export async function getUserByEmail(email) {
    const user = await prisma.user.findUnique({
        where: {email: email}
    });

    return user;
}

export async function getUserById(id) {
    const user = await prisma.user.findUnique({
        where: {id: id},
        include: {
            playlists: true
        }
    });

    return user;
}

export async function createPlaylist(userId, playlistName) {
    const playlist = await prisma.playlist.create({
        data: {
            title: playlistName,
            authorId: userId
        }
    });

    return playlist;
}

export async function getSongsByName(songName) {
    const deletePlaylist = await prisma.song.findMany({
        where: {
            title: {
                contains: songName
            }
        },
        include: {
            album: {
                include: {
                    artist: true
                }
            }
        }
    })

    return deletePlaylist;
}

export async function deletePlaylistById(playlistId) {
    const res = await prisma.playlist.delete({
        where: {
            id: playlistId
        }
    });
}

export async function addSongToPlaylistById(songId, playlistId) {

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

export async function removeSongFromPlaylistById(playlistId, songId) {
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

export async function retrieveSong(songId) {
    const song = await prisma.song.findUnique({
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
                    artist: true
                }
            }
        }
    });

    if (song.album.cover){
        song.album.cover = song.album.cover.toString('base64');
    }

    return song;
}

export async function retrieveSongFile(songId) {
    const songFile = await prisma.song.findUnique({
        where: {
            id: songId
        },
        select: {
            audioFile: true
        }
    });

    return songFile.audioFile;
}