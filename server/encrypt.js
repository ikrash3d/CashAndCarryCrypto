const crypto = require("crypto");
const algorithm = process.env.ALGORITHM;
const secretKey = process.env.SECRET_KEY;
const iv = crypto.randomBytes(process.env.RANDOM_BYTES | 0);

const encrypt = (text) => {
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  return {
    iv: iv.toString("hex"),
    content: encrypted.toString("hex"),
  };
};

const decrypt = (hash) => {
  const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv), "hex");
  const decrypted = Buffer.concat([decipher.update(Buffer.from(hash.content, "hex")), decipher.final()]);
  return decrypted.toString();
};

module.exports = { encrypt, decrypt };
