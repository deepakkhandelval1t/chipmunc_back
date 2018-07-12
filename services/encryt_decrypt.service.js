
const crypto = require('crypto');
var bcrypt = require("bcrypt-nodejs");
//const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // Must be 256 bytes (32 characters)
const ENCRYPTION_KEY = '1254125478mknjhbgfdtg./;^%&%$h2?'; // need to find place where to store this key
const IV_LENGTH = 16; // For AES, this is always 16
const SALT_ROUND = 10;

function encrypt(text) {
    let iv = crypto.randomBytes(IV_LENGTH);
    let cipher = crypto.createCipheriv('aes-256-cbc', new Buffer(ENCRYPTION_KEY), iv); // need to find place where to store key
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(encrText) {
    let textParts = encrText.split(':');
    let iv = new Buffer(textParts.shift(), 'hex');
    let encryptedText = new Buffer(textParts.join(':'), 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', new Buffer(ENCRYPTION_KEY), iv);  // need to find place where to store key
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

function hash(text){
    return crypto.createHash('md5').update(text).digest('hex');
}

function cryptoHash(text){
    return bcrypt.hashSync(text);
}

module.exports = { decrypt, encrypt, hash, cryptoHash };