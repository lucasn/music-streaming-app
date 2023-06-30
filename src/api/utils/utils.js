export function bytesToBase64(bytes) {
    return bytes.toString('base64');
}

export function base64ToBytes(base64String) {
    return Buffer.from(base64String, 'base64');
}