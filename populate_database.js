import { PrismaClient } from '@prisma/client';
import { readFileSync } from 'fs'

const prisma = new PrismaClient();

async function getImageAsByte(file) {
    return Buffer.from(new Uint8Array(await readFileSync(file)), 'base64');
}

async function main() {
    const cover = await getImageAsByte('./public/images/album.jpg');
    
    for(let i = 1 ; i <= 3 ; i++){
        await prisma.song.update({
            where: {
                id: i
            },
            data: {
                audioFile: Buffer.from("teste", "utf-8")
            }
        });
    }
}

main();
// async function populate_database() {

//     await prisma.artist.create({
//         data: {
//             name: 'Eminem',
//             password: '123',
//             profilePicture: await getImageAsByte("public/images/eminem.png"),
//             albuns: {
//                 create: [
//                     {
//                         name: 'The Marshall Mathers',
//                         year: 2000,
//                         cover: await getImageAsByte('./public/images/eminem-album.png'),
//                         songs: {
//                             create: [
//                                 {
//                                     title: 'Mockingbird',
//                                     audioFile: Buffer.from('teste', 'utf8'),
//                                 },
//                                 {
//                                     title: 'Crazy in Love',
//                                     audioFile: Buffer.from('teste', 'utf8'),
//                                 }

//                             ]
//                         }
//                     },
//                     {
//                         name: 'Encore',
//                         year: 2004,
//                         cover: await getImageAsByte('./public/images/eminem-album2.jpg'),
//                         songs: {
//                             create: [
//                                 {
//                                     title: 'The Real Slim Shady',
//                                     audioFile: Buffer.from('teste', 'utf8'),
//                                 }
//                             ]
//                         }
//                     }
//                 ]
//             }
//         }
//     })
// }

// populate_database()
//     .then(async () => {
//         await prisma.$disconnect()
//     })
//     .catch(async (e) => {
//         console.error(e)
//         await prisma.$disconnect()
//         process.exit(1)
//     })