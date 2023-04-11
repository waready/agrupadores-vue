import CryptoJS from "crypto-js";
import SecureStorage from "secure-web-storage";

const SECRET_KEY = process.env.VUE_APP_CLIENT_SECRET;

function makeSecureStorage(storage = new Storage()) {
  return new SecureStorage(storage, {
    hash: function hash(key) {
      key = CryptoJS.SHA256(key, SECRET_KEY);
      return key.toString();
    },
    encrypt: function encrypt(data) {
      data = CryptoJS.AES.encrypt(data, SECRET_KEY);
      data = data.toString();
      return data;
    },
    decrypt: function decrypt(data) {
      data = CryptoJS.AES.decrypt(data, SECRET_KEY);
      data = data.toString(CryptoJS.enc.Utf8);
      return data;
    }
  });
}

var secureStorage = makeSecureStorage(localStorage);

// if (process.env.NODE_ENV == "development") {
//   secureStorage = localStorage;
// }

export { secureStorage };
export default secureStorage;
