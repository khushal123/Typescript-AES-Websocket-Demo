import { createHash, randomBytes, createCipheriv, createDecipheriv } from 'crypto'
import { SecretUser } from '../entity/user';

const algorithmCTR = "aes-256-ctr";
const key = randomBytes(32)

export function genHashSHA256(text: string): string {
    return createHash('sha256').update(text).digest("hex")
}

export function encryptAES256CTR(secretUser: string): string {
    try {
        const iv = randomBytes(16)
        const cipher = createCipheriv(algorithmCTR, Buffer.from(key), iv);
        let hashString = cipher.update(JSON.stringify(secretUser));
        const encrypted = Buffer.concat([hashString, cipher.final()]);
        return iv.toString('hex') + ":" + encrypted.toString('hex')
    }
    catch (error) {
        throw error;
    }

}

export function decryptAES256CTR(secretUser: string): string {
    try {
        console.log(secretUser)
        const text = secretUser.split(":");
        let iv = Buffer.from(text[0], 'hex');
        let encryptedText = Buffer.from(text[1], 'hex');
        let decipher = createDecipheriv(algorithmCTR, Buffer.from(key), iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    } catch (error) {
        throw error
    }
}

//Todo
/**
 * 
 * @param secretUser 
 */
export function compareHash(secretUser: SecretUser) {
    
}
