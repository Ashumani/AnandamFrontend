import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import forge from 'node-forge';

// let originalText = '';
// let encryptedData = '';
let decryptedData = '';
let publicKeyPem = '';
let privateKeyPem = '';

// Generate RSA key pair
const generateKeyPair = () => {
    const { publicKey, privateKey } = forge.pki.rsa.generateKeyPair(2048);
    publicKeyPem = forge.pki.publicKeyToPem(publicKey)
    privateKeyPem = forge.pki.privateKeyToPem(privateKey);
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
    console.log({ encryptedText, encryptedAesKey, iv })
};

export const handleDecryption = async (encryptedData) => {
    const { encryptedText, encryptedAesKey, iv } = encryptedData;
    const aesKey = decryptKey(encryptedAesKey, privateKeyPem);
    const decryptedText = decryptData(encryptedText, aesKey, iv);
    // setDecryptedData(decryptedText);
    console.log({ decryptedText })
};

