import { PrismaClient } from '@prisma/client';
import { readFileSync } from 'fs'

const prisma = new PrismaClient();

async function getImageAsByte(file) {
    return Buffer.from(new Uint8Array(await readFileSync(file)), 'base64');
}

async function populate_database() {

    await prisma.artist.create({
        data: {
            name: 'Eminem',
            email: 'eminem@gmail.com',
            password: '123',
            profilePicture: await getImageAsByte("./public/images/eminem.png"),
            albuns: {
                create: [
                    {
                        name: 'The Marshall Mathers',
                        year: 2000,
                        cover: await getImageAsByte('./public/images/eminem-album.png'),
                        songs: {
                            create: [
                                {
                                    title: 'Mockingbird',
                                    audioFile: readFileSync('./public/mockingbird.mp3'),
                                },
                                {
                                    title: 'Crazy in Love',
                                    audioFile: readFileSync('./public/crazy_in_love.mp3'),
                                }

                            ]
                        }
                    },
                    {
                        name: 'Encore',
                        year: 2004,
                        cover: await getImageAsByte('./public/images/eminem-album2.jpg'),
                        songs: {
                            create: [
                                {
                                    title: 'The Real Slim Shady',
                                    audioFile: readFileSync('./public/the_real_slim_shady.mp3'),
                                }
                            ]
                        }
                    }
                ]
            }
        }
    });
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