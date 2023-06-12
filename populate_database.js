import { PrismaClient } from '@prisma/client';
import { readFileSync, writeFileSync } from 'fs'

const prisma = new PrismaClient();

async function getImageAsByte(file) {
    return Buffer.from(new Uint8Array(await readFileSync(file)), 'base64');
}

async function populate_database() {

    // const artist = {
    //     name: 'Eminem',
    //     password: '123',
    //     profilePicture: await getImageAsByte("public/images/eminem.png")
    // }
        
    // try {
    //     await prisma.artist.create({
    //         data: artist
    //     })
    // } catch (err) {
    //     console.log(err.message);
    // }
        
    // const album1 = {
    //     name: 'The Marshall Mathers',
    //     year: 2000,
    //     cover: await getImageAsByte('./public/images/eminem-album.png'),
    //     artistId: 2        
    // };
    
    // const album2 = {
    //     name: 'Encore',
    //     year: 2004,
    //     cover: await getImageAsByte('./public/images/eminem-album2.jpg'),
    //     artistId: 2        
    // };

    // await prisma.album.create({data: album1});
    // await prisma.album.create({data: album2});

    const song1 = {
        title: 'Mockingbird',
        audioFile: Buffer.from('teste', 'utf8'),
        albumId: 3
    };
    const song2 = {
        title: 'Crazy in Love',
        audioFile: Buffer.from('teste', 'utf8'),
        albumId: 3
    };
    const song3 = {
        title: 'The Real Slim Shady',
        audioFile: Buffer.from('teste', 'utf8'),
        albumId: 2
    }

    try {
        await prisma.song.create({
            data: song1
        });
        await prisma.song.create({
            data: song2
        });
        await prisma.song.create({
            data: song3
        });
    } catch (err) {
        console.log(err);
    }

    // const playlist = {
    //     title: 'Músicas Curtidas',
    //     songs: {create: song}
    // }

    // await prisma.user.create({
    //     data: {
    //         name: 'Lucas',
    //         email: 'lucasnoronha@gmail.com',
    //         password: 'senha',
    //         playlists: {create: playlist}
    //     }
    // });

    // await prisma.playlist.create({
    //     data: {
    //         title: 'Playlist 1',
    //         authorId: 1
    //     }
    // })


    
    // console.log(res);

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