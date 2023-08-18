import CryptoJS from "crypto-js";

function encrypt(data) {
  let encryptedData = CryptoJS.AES.encrypt(data, process.env.REACT_APP_EncryptionKey);
  return encryptedData;
}

function decrypt(data) {
  let decryptedBytes = CryptoJS.AES.decrypt(data, process.env.REACT_APP_EncryptionKey);
  let decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return decryptedData;
}

export const EncryptData = (data) => {
  const encryptedData = encrypt(data);
  return encryptedData;
};

export const DecryptData = (data) => {
  const decryptedData = decrypt(data);
  return decryptedData;
};
