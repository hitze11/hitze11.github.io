const CryptoJS = require('crypto-js');

// Generieren eines zufälligen 16-Byte-Schlüssels
const secretKey = CryptoJS.lib.WordArray.random(16).toString();
console.log("Generated Secret Key:", secretKey);