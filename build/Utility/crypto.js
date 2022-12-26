"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptQrData = exports.HcEncryption = exports.decryptJSS = exports.EncryptCredintialGuids = exports.decryptJS = exports.testEncryptFixed = exports.randomString = exports.DecryptCredintialGuid = exports.EncryptCredintialGuid = exports.testEncrypt = exports.makeid = exports.getEncryptedUserID = exports.encryptData = void 0;
const crypto_js_1 = __importDefault(require("crypto-js"));
// import agent from "../agent/RecruiterPortal/index";
// import { store } from "../store";
const makeid = (length) => __awaiter(void 0, void 0, void 0, function* () {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    localStorage.setItem("IV", result);
    return result;
});
exports.makeid = makeid;
const testEncrypt = (plain) => __awaiter(void 0, void 0, void 0, function* () {
    let randomIV = yield makeid(16);
    let ivgenerate = testEncryptFixed(Math.floor(Math.random() * 90000) +
        10000 +
        "_" +
        // store.getState().Auth.user.Data.UserID +
        "_" +
        randomIV +
        "_" +
        Math.round(+new Date() / 1000));
    localStorage.setItem("IV", ivgenerate);
    var key = crypto_js_1.default.enc.Utf8.parse("$P@mOu$0172@0r!P");
    var iv = crypto_js_1.default.enc.Utf8.parse(randomIV);
    var encrypted = crypto_js_1.default.AES.encrypt(crypto_js_1.default.enc.Utf8.parse(plain.toString()), key, {
        keySize: 128 / 8,
        iv: iv,
        mode: crypto_js_1.default.mode.CBC,
        padding: crypto_js_1.default.pad.Pkcs7,
    });
    return encrypted.toString();
});
exports.testEncrypt = testEncrypt;
// const testEncryptFixed = (plain) => {
//   var key = CryptoJS.enc.Utf8.parse("$P@mOu$0172@0r!P");
//   var iv = CryptoJS.enc.Utf8.parse("@1O2j3D4e5F6g7P8");
//   var encrypted = CryptoJS.AES.encrypt(JSON.stringify(plain), key, {
//     keySize: 128 / 8,
//     iv: iv,
//     mode: CryptoJS.mode.CBC,
//     padding: CryptoJS.pad.Pkcs7,
//   });
//   return encrypted.toString();
// };
// const testEncryptt = async (plain) => {
//   let randomIV = await makeid(16);
//   let ivgenerate = testEncryptFixedd(
//     Math.floor(Math.random() * 90000) +
//       10000 +
//       "_" +
//       // store.getState().Auth.user.Data.UserID +
//       "_" +
//       randomIV +
//       "_" +
//       Math.round(+new Date() / 1000)
//   );
//   localStorage.setItem("IV", ivgenerate);
//   var key = CryptoJS.enc.Utf8.parse("$P@mOu$0172@0r!P");
//   var iv = CryptoJS.enc.Utf8.parse(randomIV);
//   var encrypted = CryptoJS.AES.encrypt(
//     CryptoJS.enc.Utf8.parse(plain.toString()),
//     key,
//     {
//       keySize: 128 / 8,
//       iv: iv,
//       mode: CryptoJS.mode.CBC,
//       padding: CryptoJS.pad.Pkcs7,
//     }
//   );
//   return encrypted.toString();
// };
const testEncryptFixed = (plain) => __awaiter(void 0, void 0, void 0, function* () {
    let randomIV = yield makeid(16);
    var key = crypto_js_1.default.enc.Utf8.parse("$P@mOu$0172@0r!P");
    var iv = crypto_js_1.default.enc.Utf8.parse(randomIV);
    // var iv = CryptoJS.enc.Utf8.parse("@1O2j3D4e5F6g7P8");
    // console.log(iv, randomIV);
    var encrypted = crypto_js_1.default.AES.encrypt(JSON.stringify(plain), key, {
        keySize: 128 / 8,
        iv: iv,
        mode: crypto_js_1.default.mode.CBC,
        padding: crypto_js_1.default.pad.Pkcs7,
    });
    return encrypted.toString() + randomIV;
    // return encrypted.toString();
});
exports.testEncryptFixed = testEncryptFixed;
const decryptJS = (cipherData) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("data here", cipherData);
    var key = crypto_js_1.default.enc.Utf8.parse("$P@mOu$0172@0r!P");
    var iv = crypto_js_1.default.enc.Utf8.parse(cipherData.slice(cipherData.length - 16));
    cipherData = cipherData.slice(0, cipherData.length - 16);
    var decrypted = crypto_js_1.default.AES.decrypt(cipherData, key, {
        keySize: 128 / 8,
        iv: iv,
        mode: crypto_js_1.default.mode.CBC,
        padding: crypto_js_1.default.pad.Pkcs7,
    });
    // let aa = await decrypted.toString(CryptoJS.enc.Utf8);
    // console.log(decrypted.toString(CryptoJS.enc.Utf8));
    // return JSON.parse(decrypted);
    // console.log(JSON.parse(decrypted.toString(CryptoJS.enc.Utf8)));
    // aa = JSON.parse(aa);
    return decrypted.toString(crypto_js_1.default.enc.Utf8);
    // return JSON.parse(aa);
    // console.log(JSON.parse(aa));
    // return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    // toString(CryptoJS.enc.Utf8)
});
exports.decryptJS = decryptJS;
const decryptJSS = (cipherData) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("data here", cipherData);
    // let randomIV = await makeid(16);
    var key = crypto_js_1.default.enc.Utf8.parse("$P@mOu$0172@0r!P");
    // string keytest = "d7a50e0f2f9546d35ce700eebfb0c911";
    // var key = CryptoJS.enc.Utf8.parse("d7a50e0f2f9546d35ce700eebfb0c911");
    // var key = CryptoJS.enc.Utf8.parse("$P@mOu$0172@0r!P");
    var iv = crypto_js_1.default.enc.Utf8.parse("@1O2j3D4e5F6g7P8");
    // var iv = CryptoJS.enc.Utf8.parse(randomIV);
    var decrypted = crypto_js_1.default.AES.decrypt(cipherData, key, {
        keySize: 128 / 8,
        iv: iv,
        mode: crypto_js_1.default.mode.CBC,
        padding: crypto_js_1.default.pad.Pkcs7,
    });
    return decrypted.toString(crypto_js_1.default.enc.Utf8);
});
exports.decryptJSS = decryptJSS;
const encryptData = (plainText) => __awaiter(void 0, void 0, void 0, function* () {
    var key = "8080808080808080";
    var iv = crypto_js_1.default.enc.Utf8.parse("8080808080808080");
    var encrypted = crypto_js_1.default.AES.encrypt(crypto_js_1.default.enc.Utf8.parse(plainText.toString()), key, {
        keySize: 128 / 8,
        iv: iv,
        mode: crypto_js_1.default.mode.CBC,
        padding: crypto_js_1.default.pad.Pkcs7,
    });
    return encrypted;
});
exports.encryptData = encryptData;
const encryptQrData = (plainText) => __awaiter(void 0, void 0, void 0, function* () {
    var key = "$X@mOu$0172@0r!X";
    // var iv = CryptoJS.enc.Utf8.parse("8080808080808080");
    // var encrypted = CryptoJS.AES.encrypt(
    //   CryptoJS.enc.Utf8.parse(plainText.toString()),
    //   key,
    //   {
    //     keySize: 128 / 8,
    //     iv: iv,
    //     mode: CryptoJS.mode.CBC,
    //     padding: CryptoJS.pad.Pkcs7,
    //   }
    // );
    // return encrypted;
    // let encrypted = CryptoJS.AES.encrypt(plainText, key);
    //   let encrypted = CryptoJS.AES.encrypt( CryptoJS.enc.Utf8.parse(plainText.toString()), key);
    // return encrypted;
    // var key = CryptoJS.enc.Utf8.parse("$P@mOu$0172@0r!P");
    // var iv = CryptoJS.enc.Utf8.parse(randomIV);
    // var iv = CryptoJS.enc.Utf8.parse("@1O2j3D4e5F6g7P8");
    // console.log(iv, randomIV);
    let encrypted = crypto_js_1.default.AES.encrypt(JSON.stringify(plainText), key, {
        keySize: 128 / 8,
        mode: crypto_js_1.default.mode.CBC,
    });
    return encrypted.toString();
});
exports.encryptQrData = encryptQrData;
const getEncryptedUserID = (plainText) => __awaiter(void 0, void 0, void 0, function* () {
    let key = crypto_js_1.default.enc.Utf8.parse("d7a50e0f2f9546d35ce700eebfb0c911");
    let iv = crypto_js_1.default.enc.Utf8.parse(yield makeid(16));
    var encrypted = crypto_js_1.default.AES.encrypt(crypto_js_1.default.enc.Utf8.parse(plainText.toString()), key, {
        keySize: 128 / 8,
        iv: iv,
        mode: crypto_js_1.default.mode.CBC,
        padding: crypto_js_1.default.pad.Pkcs7,
    });
    return encrypted.toString();
});
exports.getEncryptedUserID = getEncryptedUserID;
const EncryptCredintialGuid = (txtdata, keyValue) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var key = crypto_js_1.default.enc.Utf8.parse(keyValue);
        var iv = crypto_js_1.default.enc.Utf8.parse(keyValue);
        var encrypteddata = crypto_js_1.default.AES.encrypt(crypto_js_1.default.enc.Utf8.parse(txtdata), key, {
            keySize: 128 / 8,
            iv: iv,
            mode: crypto_js_1.default.mode.CBC,
            padding: crypto_js_1.default.pad.Pkcs7,
        });
    }
    catch (err) {
        localStorage.clear();
    }
    return encrypteddata.toString();
});
exports.EncryptCredintialGuid = EncryptCredintialGuid;
function EncryptCredintialGuids(txtdata) {
    try {
        var UniqGuid = JSON.parse(localStorage.getItem("UserDetails")).Token;
        UniqGuid = UniqGuid.substr(0, 16);
        var key = crypto_js_1.default.enc.Utf8.parse(UniqGuid);
        var iv = crypto_js_1.default.enc.Utf8.parse(UniqGuid);
        var encrypteddata = crypto_js_1.default.AES.encrypt(crypto_js_1.default.enc.Utf8.parse(txtdata), key, {
            keySize: 128 / 8,
            iv: iv,
            mode: crypto_js_1.default.mode.CBC,
            padding: crypto_js_1.default.pad.Pkcs7,
        });
    }
    catch (err) { }
    return encrypteddata.toString();
}
exports.EncryptCredintialGuids = EncryptCredintialGuids;
const DecryptCredintialGuid = (txtdata, keyValue) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var key = crypto_js_1.default.enc.Utf8.parse(keyValue);
        var iv = crypto_js_1.default.enc.Utf8.parse(keyValue);
        var encrypteddata = crypto_js_1.default.AES.decrypt(txtdata, key, {
            keySize: 128 / 8,
            iv: iv,
            mode: crypto_js_1.default.mode.CBC,
            padding: crypto_js_1.default.pad.Pkcs7,
        });
        encrypteddata = encrypteddata.toString(crypto_js_1.default.enc.Utf8);
    }
    catch (err) {
        //localStorage.clear();
        console.log(err);
    }
    //  console.log(encrypteddata.toString())
    return JSON.parse(encrypteddata);
});
exports.DecryptCredintialGuid = DecryptCredintialGuid;
const randomString = (length) => __awaiter(void 0, void 0, void 0, function* () {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    var key = text + navigator.sayswho + 1536;
    return key;
});
exports.randomString = randomString;
const HcEncryption = (plain) => __awaiter(void 0, void 0, void 0, function* () {
    var key = crypto_js_1.default.enc.Utf8.parse("$P@mOu$0172@0r!P");
    var iv = crypto_js_1.default.enc.Utf8.parse("@1O2j3D4e5F6g7P8");
    var encrypted = crypto_js_1.default.AES.encrypt(JSON.stringify(plain), key, {
        keySize: 128 / 8,
        iv: iv,
        mode: crypto_js_1.default.mode.CBC,
        padding: crypto_js_1.default.pad.Pkcs7,
    });
    return encrypted.toString(); // return encrypted.toString();};
});
exports.HcEncryption = HcEncryption;
