import CryptoJS from "crypto-js";

// import agent from "../agent/RecruiterPortal/index";

// import { store } from "../store";

const makeid = async (length) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  localStorage.setItem("IV", result);
  return result;
};

const testEncrypt = async (plain) => {
  let randomIV = await makeid(16);
  let ivgenerate = testEncryptFixed(
    Math.floor(Math.random() * 90000) +
      10000 +
      "_" +
      // store.getState().Auth.user.Data.UserID +
      "_" +
      randomIV +
      "_" +
      Math.round(+new Date() / 1000)
  );
  localStorage.setItem("IV", ivgenerate);
  var key = CryptoJS.enc.Utf8.parse("$P@mOu$0172@0r!P");
  var iv = CryptoJS.enc.Utf8.parse(randomIV);
  var encrypted = CryptoJS.AES.encrypt(
    CryptoJS.enc.Utf8.parse(plain.toString()),
    key,
    {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );

  return encrypted.toString();
};

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

const testEncryptFixed = async (plain) => {
  let randomIV = await makeid(16);
  var key = CryptoJS.enc.Utf8.parse("$P@mOu$0172@0r!P");
  var iv = CryptoJS.enc.Utf8.parse(randomIV);
  // var iv = CryptoJS.enc.Utf8.parse("@1O2j3D4e5F6g7P8");
  // console.log(iv, randomIV);
  var encrypted = CryptoJS.AES.encrypt(JSON.stringify(plain), key, {
    keySize: 128 / 8,
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString() + randomIV;
  // return encrypted.toString();
};

const decryptJS = async (cipherData) => {
  // console.log("data here", cipherData);
  var key = CryptoJS.enc.Utf8.parse("$P@mOu$0172@0r!P");
  var iv = CryptoJS.enc.Utf8.parse(cipherData.slice(cipherData.length - 16));
  cipherData = cipherData.slice(0, cipherData.length - 16);
  var decrypted = CryptoJS.AES.decrypt(cipherData, key, {
    keySize: 128 / 8,
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  // let aa = await decrypted.toString(CryptoJS.enc.Utf8);
  // console.log(decrypted.toString(CryptoJS.enc.Utf8));
  // return JSON.parse(decrypted);
  // console.log(JSON.parse(decrypted.toString(CryptoJS.enc.Utf8)));
  // aa = JSON.parse(aa);
  return decrypted.toString(CryptoJS.enc.Utf8);
  // return JSON.parse(aa);
  // console.log(JSON.parse(aa));
  // return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  // toString(CryptoJS.enc.Utf8)
};

const decryptJSS = async (cipherData) => {
  // console.log("data here", cipherData);
  // let randomIV = await makeid(16);
  var key = CryptoJS.enc.Utf8.parse("$P@mOu$0172@0r!P");
  // string keytest = "d7a50e0f2f9546d35ce700eebfb0c911";
  // var key = CryptoJS.enc.Utf8.parse("d7a50e0f2f9546d35ce700eebfb0c911");
  // var key = CryptoJS.enc.Utf8.parse("$P@mOu$0172@0r!P");
  var iv = CryptoJS.enc.Utf8.parse("@1O2j3D4e5F6g7P8");
  // var iv = CryptoJS.enc.Utf8.parse(randomIV);
  var decrypted = CryptoJS.AES.decrypt(cipherData, key, {
    keySize: 128 / 8,
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return decrypted.toString(CryptoJS.enc.Utf8);
};

const encryptData = async (plainText) => {
  var key = "8080808080808080";
  var iv = CryptoJS.enc.Utf8.parse("8080808080808080");
  var encrypted = CryptoJS.AES.encrypt(
    CryptoJS.enc.Utf8.parse(plainText.toString()),
    key,
    {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );
  return encrypted;
};

const encryptQrData = async (plainText) => {
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

  let encrypted = CryptoJS.AES.encrypt(JSON.stringify(plainText), key, {
    keySize: 128 / 8,
    mode: CryptoJS.mode.CBC,
  });
  return encrypted.toString();
};

const getEncryptedUserID = async (plainText) => {
  let key = CryptoJS.enc.Utf8.parse("d7a50e0f2f9546d35ce700eebfb0c911");
  let iv = CryptoJS.enc.Utf8.parse(await makeid(16));
  var encrypted = CryptoJS.AES.encrypt(
    CryptoJS.enc.Utf8.parse(plainText.toString()),
    key,
    {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );
  return encrypted.toString();
};

const EncryptCredintialGuid = async (txtdata, keyValue) => {
  try {
    var key = CryptoJS.enc.Utf8.parse(keyValue);
    var iv = CryptoJS.enc.Utf8.parse(keyValue);

    var encrypteddata = CryptoJS.AES.encrypt(
      CryptoJS.enc.Utf8.parse(txtdata),
      key,
      {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    );
  } catch (err) {
    localStorage.clear();
  }
  return encrypteddata.toString();
};

function EncryptCredintialGuids(txtdata) {
  try {
    var UniqGuid = JSON.parse(localStorage.getItem("UserDetails")).Token;
    UniqGuid = UniqGuid.substr(0, 16);
    var key = CryptoJS.enc.Utf8.parse(UniqGuid);
    var iv = CryptoJS.enc.Utf8.parse(UniqGuid);
    var encrypteddata = CryptoJS.AES.encrypt(
      CryptoJS.enc.Utf8.parse(txtdata),
      key,
      {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    );
  } catch (err) {}
  return encrypteddata.toString();
}

const DecryptCredintialGuid = async (txtdata, keyValue) => {
  try {
    var key = CryptoJS.enc.Utf8.parse(keyValue);
    var iv = CryptoJS.enc.Utf8.parse(keyValue);

    var encrypteddata = CryptoJS.AES.decrypt(txtdata, key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    encrypteddata = encrypteddata.toString(CryptoJS.enc.Utf8);
  } catch (err) {
    //localStorage.clear();
    console.log(err);
  }
  //  console.log(encrypteddata.toString())
  return JSON.parse(encrypteddata);
};

const randomString = async (length) => {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  var key = text + navigator.sayswho + 1536;

  return key;
};

const HcEncryption = async (plain) => {
  var key = CryptoJS.enc.Utf8.parse("$P@mOu$0172@0r!P");
  var iv = CryptoJS.enc.Utf8.parse("@1O2j3D4e5F6g7P8");
  var encrypted = CryptoJS.AES.encrypt(JSON.stringify(plain), key, {
    keySize: 128 / 8,
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString(); // return encrypted.toString();};
};

export {
  encryptData,
  getEncryptedUserID,
  makeid,
  testEncrypt,
  // testEncryptt,
  EncryptCredintialGuid,
  DecryptCredintialGuid,
  randomString,
  testEncryptFixed,
  // testEncryptFixedd,
  decryptJS,
  // decryptJSS,
  EncryptCredintialGuids,
  decryptJSS,
  HcEncryption,
  encryptQrData,
};
