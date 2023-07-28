const fs = require('fs');
const jwt = require('jsonwebtoken');

// สร้างคีย์สำหรับการลงลายมือดิจิตอล RS256 ในอัลกอริทึม JWT
const { publicKey, privateKey } = jwt.generateKeyPairSync('rsa', {
  modulusLength: 2048, // ขนาดของการรวมตัวของโมดูลัส
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem',
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
  },
});

// บันทึกคีย์ลงในแฟ้ม (ในกรณีนี้เราจะบันทึกไว้ในแฟ้ม private.pem และ public.pem)
fs.writeFileSync('private.pem', privateKey);
fs.writeFileSync('public.pem', publicKey);

console.log('สร้างคีย์สำหรับการลงลายมือดิจิตอล RS256 เสร็จสิ้นแล้ว');
