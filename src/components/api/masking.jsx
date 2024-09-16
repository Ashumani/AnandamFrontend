import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import forge from 'node-forge';

// let originalText = '';
// let encryptedData = '';
let decryptedData = '';
let publicKeyPem = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAznA3zS86ou4lbWJc6kQa
3vCFv4TnJV8usD84RnIWYIS3bYET604Z6Ntswv3MPOdCga9ZhqtJnPHD3y6rs7oM
PdtK29Ykc4UnBj8o0nd+Po9Aif0C6FCzk053LWjblU2ujenG7Xz867kiy2kCJlD3
epX47Nyy6L8ziZ+foLRjtCARzPv7MFfKg6W6Bx8OacsylHCnB+BufKKEPeHXxplI
SJEOCTZgk9jmKgpgNA+1R2diG1j4NdnxPw1cCtgE8A7ziVVrjA34/SYj3tXb3xRo
1ouYrt0T/UnIz/7FvqlN5yHsRgi4COgxHTcQzz339TQZZwBiashqe2JewzQG2dpb
VwIDAQAB
-----END PUBLIC KEY-----`;
let privateKeyPem = `-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEAhHwwcvG0wgYdIE3FonXe8BqzcYMrhBbPQOIfjpiVIbyAnBQn
QGUNGVVVRx37aVsPr1iotGp95kQKmAwmaR7ZQUvMezNVZ8vmMzvUozb7oNl+xEJa
JOtHgTJl3u/fbPutAzw3rm2J200zwQUx3IcIsjXnz3Qcv3iZGRrtgrrFCD7Cz0Ir
3Fxn/CUWzYsZZf4jPyc3cQtiQbxkSXZqusiNz+Vt/6lZ8PoHKRzZh6f4noPpL2ge
OPP/LukOEo+lFsYd6t8nGadPA5Sa+JuJVxV8olnNv7b4s6bytSIzXM4/2LxEqUdC
+0fKP5mMDiYl64V8EI8wk+hi0s0gFXcH6OXl9wIDAQABAoIBABPvL8cL0VvkWZuT
uCoSvEG6csegqfqNCBBGNeNZ2A6kc2GIssNAsTDfox45R6v5lKmYmIHVCC6OjF2G
bn0gtCXcBt9+wNoGVxPca8lHK6NvNmDHbxLhB/hLogJia2bVk5nKBMLNHpIN0ry3
UGJTOx69d6zCVtUEi1y4rYYfHih4OMuoKVcbumVBNasIgKfDNGgprF72P3jo0FoW
Esxxv0csmsTlLcjOCzvLOO3v3W2yYY7D3MacQukw0HSJYl3Iv1uv96PnrRdAW8g3
7PP+wBd57UkhNC2gtWQgyUOHlHhEnUw64Xx9PYIci4iE1vDPjLp36vaGiUZsO1gm
AsA8BbECgYEA2xN4i7I8F2VrJJXgsu9ZKXc5n5Yjj776GMi7uKWurDNE1RPKT19Q
K9ZbOb6sHuNRXAMt4/7VRiefqMdVXdGOiM7hOv7KrgmrK34sF4E6UTzGzAilIRzB
5C5dunBmOCYIXoSBJ4k/RfiD/QXkW+MCTtH0TsubsXXp92el/eYy8QkCgYEAmtCO
sc+ZVMt9MyOlN1ZuPu5fwVL1XNN9Y1Zm7EXx/JZSZ5vV1WApHahPvba9F/iFnp1a
nNBoDHR1kHUomgDVUSHtsDDKYOF4lS81Vv5wzj5LhEVSjfgEar5e+y/UrR/kU8fH
BfC0EOypQl5BcJTKyer343VXeMTs39Kr+DiS3v8CgYB/qFftJ14mz/1gI0n9WsWd
CRF18fok8EcyG/5veXRQecuZUl/oYoUIFm+wNXB8yz+Em4GpQryqlbpOkmEnO06Q
X+UVCJW4Vn/85xfwVmhSIFVDXaJDqks9mNsbIhYej+L+mL3d+Pb64fafgUhxVtXo
ciWnqLO/9BLzDN3IFtUGaQKBgHMGZA8e1KjY7DPz1wxvjkf5qnGkJqOKi04kYyJH
sczfD2jlsxHveX0Mkfq97G8D+ptoBGwguD4QxUzIj5sk5Vl7oPNYvPUQcRw+0B3L
vJqwVEF5lCXhUb7RpRZyak0bNfU9qNT0C4XLoNKr32k7VBSEHRwGEjCr9+cwyw8J
Ua6XAoGBAMBDMlGFBqya5EdTtu1X9BgkG50mKc7EtgMBMUqpgB1jh1Q0WGJQk0ef
VYJWUFeCND6iC4CmTsljHIYSusJ9VkGqJPfzAkKivLYAFXQn8DC5apiVl94+cXVy
RYcdD/ELdvL0RMFIwIYlhIbnTmdwzWMs0s0vaNVugJZs+eWM48Qt
-----END RSA PRIVATE KEY-----`;

// Generate RSA key pair
const generateKeyPair = () => {
    // const { publicKey, privateKey } = forge.pki.rsa.generateKeyPair(2048);
    // publicKeyPem = forge.pki.publicKeyToPem(publicKey)
    // privateKeyPem = forge.pki.privateKeyToPem(privateKey);
    // console.log(privateKeyPem)
};

// Encrypt data with AES
const encryptData = (text, key) => {
    const iv = forge.random.getBytesSync(16);
    const cipher = forge.cipher.createCipher('AES-CBC', key);
    cipher.start({ iv });
    cipher.update(forge.util.createBuffer(text, 'utf8'));
    cipher.finish();
    const encrypted = cipher.output.toHex();
    return { encryptedData: encrypted, iv };
};

// Decrypt data with AES
const decryptData = (encryptedData, key, iv) => {
    const decipher = forge.cipher.createDecipher('AES-CBC', key);
    decipher.start({ iv });
    decipher.update(forge.util.createBuffer(forge.util.hexToBytes(encryptedData)));
    decipher.finish();
    return decipher.output.toString('utf8');
};

// Encrypt AES key with RSA public key
const encryptKey = (aesKey, publicKeyPem) => {
    const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
    return forge.util.encode64(publicKey.encrypt(aesKey));
};

// Decrypt AES key with RSA private key
const decryptKey = (encryptedAesKey, privateKeyPem) => {
    const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);
    return privateKey.decrypt(forge.util.decode64(encryptedAesKey));
};

export const handleEncryption =  async (originalText) => {
    generateKeyPair();
    const aesKey = forge.random.getBytesSync(32); // Generate AES key
    const { encryptedData: encryptedText, iv } = encryptData(originalText, aesKey);
    const encryptedAesKey = encryptKey(aesKey, publicKeyPem);
    // setEncryptedData({ encryptedText, encryptedAesKey, iv });
    return  { encryptedText, encryptedAesKey, iv }
};

export const handleDecryption = async (encryptedData) => {
    const { encryptedText, encryptedAesKey, iv } = encryptedData;
    const aesKey = decryptKey(encryptedAesKey, privateKeyPem);
    const decryptedText = decryptData(encryptedText, aesKey, iv);
    // setDecryptedData(decryptedText);
    console.log({ decryptedText })
};

