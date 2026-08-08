import CryptoJS from 'crypto-js';

// Must be a 32-character key (256 bits). In production, keep this in process.env.REACT_APP_SECRET_KEY
const SECRET_KEY = CryptoJS.enc.Utf8.parse('12345678901234567890123456789012'); // 32 bytes

// Encrypt payload before sending to backend
export const encryptData = (data) => {
  try {
    const iv = CryptoJS.lib.WordArray.random(16); // Generate random 16-byte Initialization Vector
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    return {
      iv: iv.toString(CryptoJS.enc.Hex),
      payload: encrypted.toString()
    };
  } catch (error) {
    console.error('Encryption error:', error);
    throw error;
  }
};

// Decrypt response received from backend
export const decryptData = (encryptedObj) => {
  try {
    const { iv, payload } = encryptedObj;
    const decrypted = CryptoJS.AES.decrypt(payload, SECRET_KEY, {
      iv: CryptoJS.enc.Hex.parse(iv),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedText);
  } catch (error) {
    console.error('Decryption error:', error);
    throw error;
  }
};