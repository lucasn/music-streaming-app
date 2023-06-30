export function base64FromBytes(bytes) {
    return bytes.toString('base64');
}

export function bytesFromBase64(base64String) {
    return Buffer.from(base64String, 'base64');
}