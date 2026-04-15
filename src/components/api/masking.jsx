// 🔐 ENCRYPT (Frontend → Backend)

export async function encryptData(plainText, publicKeyPem) {
    const publicKey = await importPublicKey(publicKeyPem);

    // AES key
    const aesKey = await crypto.subtle.generateKey(
        { name: "AES-CBC", length: 256 },
        true,
        ["encrypt", "decrypt"]
    );

    const iv = crypto.getRandomValues(new Uint8Array(16));

    // Encrypt text
    const encoded = new TextEncoder().encode(plainText);

    const encryptedBuffer = await crypto.subtle.encrypt(
        { name: "AES-CBC", iv },
        aesKey,
        encoded
    );

    // Export AES key
    const rawKey = await crypto.subtle.exportKey("raw", aesKey);

    // RSA encrypt AES key
    const encryptedKey = await crypto.subtle.encrypt(
        { name: "RSA-OAEP" },
        publicKey,
        rawKey
    );

    return {
        encryptedData: bufferToHex(encryptedBuffer),
        encryptedKey: bufferToBase64(encryptedKey),
        iv: bufferToBase64(iv),
    };
}

// 🔓 DECRYPT (Frontend ← Backend)

export async function decryptData(payload, privateKeyPem) {
    const privateKey = await importPrivateKey(privateKeyPem);

    const { encryptedData, encryptedKey, iv } = payload;

    // RSA decrypt AES key
    const aesKeyBuffer = await crypto.subtle.decrypt(
        { name: "RSA-OAEP" },
        privateKey,
        base64ToBuffer(encryptedKey)
    );

    // Import AES key
    const aesKey = await crypto.subtle.importKey(
        "raw",
        aesKeyBuffer,
        { name: "AES-CBC" },
        false,
        ["decrypt"]
    );

    // AES decrypt
    const decryptedBuffer = await crypto.subtle.decrypt(
        { name: "AES-CBC", iv: base64ToBuffer(iv) },
        aesKey,
        hexToBuffer(encryptedData)
    );

    return new TextDecoder().decode(decryptedBuffer);
}

// 🔑 KEY IMPORT

async function importPublicKey(pem) {
    return crypto.subtle.importKey(
        "spki",
        pemToArrayBuffer(pem),
        { name: "RSA-OAEP", hash: "SHA-256" },
        false,
        ["encrypt"]
    );
}

async function importPrivateKey(pem) {
    return crypto.subtle.importKey(
        "pkcs8",
        pemToArrayBuffer(pem),
        { name: "RSA-OAEP", hash: "SHA-256" },
        false,
        ["decrypt"]
    );
}

// 🔧 HELPERS

function pemToArrayBuffer(pem) {
    const base64 = pem
        .replace(/-----.*?-----/g, "")
        .replace(/\s/g, "");

    const binary = atob(base64);
    const buffer = new Uint8Array(binary.length);

    for (let i = 0; i < binary.length; i++) {
        buffer[i] = binary.charCodeAt(i);
    }

    return buffer;
}

function bufferToBase64(buffer) {
    return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}

function base64ToBuffer(base64) {
    const binary = atob(base64);
    const buffer = new Uint8Array(binary.length);

    for (let i = 0; i < binary.length; i++) {
        buffer[i] = binary.charCodeAt(i);
    }

    return buffer;
}

function bufferToHex(buffer) {
    return [...new Uint8Array(buffer)]
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
}

function hexToBuffer(hex) {
    const bytes = new Uint8Array(hex.length / 2);

    for (let i = 0; i < bytes.length; i++) {
        bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
    }

    return bytes;
}