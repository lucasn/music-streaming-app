import { PrismaClient } from '@prisma/client';
import { readFileSync, writeFileSync } from 'fs'

const prisma = new PrismaClient();

async function getImageAsByte(file) {
    return Buffer.from(new Uint8Array(await readFileSync(file)), 'base64');
}

async function populate_database() {

    const artist = {
        name: 'The Weeknd',
        password: '123'
    }

    const album = {
        name: 'Encore',
        year: 2004,
        cover: await getImageAsByte('./public/images/eminem-album2.jpg'),
        artistId: 4        
    };

    const song = {
        title: 'Mockingbird',
        audioFile: Buffer.from('teste', 'utf8'),
        albumId: 2
    };

    try {
        await prisma.song.create({
            data: song
        });
    } catch (err) {
        console.log(err);
    }

    const playlist = {
        title: 'Músicas Curtidas',
        songs: {create: song}
    }

    await prisma.user.create({
        data: {
            name: 'Lucas',
            email: 'lucasnoronha@gmail.com',
            password: 'senha',
            playlists: {create: playlist}
        }
    });

    await prisma.playlist.create({
        data: {
            title: 'Playlist 1',
            authorId: 1
        }
    })

    try {
        const res = await prisma.artist.create({
            data: {
                name: 'Paramore',
                password: 'abcd',
                profilePicture: await getImageAsByte('./public/images/paramore.jpeg')
            }
        })
    } catch (err) {
        console.log(err.message);
    }

    
    console.log(res);

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