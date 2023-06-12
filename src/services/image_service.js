import { readFileSync, unlinkSync } from 'fs'

export async function getImageAsByte(filePath) {
    const imageBytes = Buffer.from(new Uint8Array(await readFileSync(filePath)), 'base64');
    unlinkSync(filePath);
    return imageBytes;
}