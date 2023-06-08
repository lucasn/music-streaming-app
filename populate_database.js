import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function populate_database() {

    // const artist = {
    //     name: 'The Weeknd',
    //     password: '123'
    // }

    // const album = {
    //     name: 'After Hours',
    //     artist: {create: artist}        
    // }

    // const song = {
    //     title: 'Die For You',
    //     audioFile: Buffer.from('teste', 'utf8'),
    //     album: {create: album}
    // }

    // const playlist = {
    //     title: 'Músicas Curtidas',
    //     songs: {create: song}
    // }

    // await prisma.user.create({
    //     data: {
    //         name: 'Lucas',
    //         password: 'senha',
    //         playlists: {create: playlist}
    //     }
    // });

    await prisma.playlist.create({
        data: {
            title: 'Playlist 1',
            authorId: 1
        }
    })
}
  
populate_database()
.then(async () => {
    await prisma.$disconnect()
})
.catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})