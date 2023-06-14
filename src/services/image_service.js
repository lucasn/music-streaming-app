import { readFileSync, unlinkSync } from 'fs'

export async function getFileAsByte(filePath) {
    const bytes = Buffer.from(new Uint8Array(await readFileSync(filePath)), 'base64');
    unlinkSync(filePath);
    return bytes;
}

export async function getDefaultCoverImage() {
    const bytes = Buffer.from(new Uint8Array(await readFileSync('./public/images/default_cover.png')), 'base64');
    return bytes;
}