let CryptoJS = require("crypto-js");

const EncryptCredintialGuid = (txtdata) => {
  let key = "$X@mOu$0172@0r!X";
  let iv = key;
  // var key = CryptoJS.enc.Utf8.parse(keyValue);
  // var iv = CryptoJS.enc.Utf8.parse(keyValue);

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

  return encrypteddata.toString();
};

let myencryptedText = EncryptCredintialGuid("Hitesh");

console.log(myencryptedText);

const DecryptCredintialGuid = async (txtdata) => {
  try {
    let key = "$X@mOu$0172@0r!X";
    let iv = key;
    var encrypteddata = CryptoJS.AES.decrypt(txtdata, key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    encrypteddata = encrypteddata.toString(CryptoJS.enc.Utf8);

    // return encrypteddata.toString(CryptoJS.enc.Utf8);

    return encrypteddata.toString();
  } catch (err) {
    //localStorage.clear();
    console.log(err);
  }
  //  console.log(encrypteddata.toString())
  //   return JSON.parse(encrypteddata);
};

let decryptedtext = DecryptCredintialGuid(myencryptedText);
console.log(decryptedtext[]);
console.log(typeof decryptedtext);

// let newtext = JSON.parse(decryptedtext);
let newtext = JSON.stringify(decryptedtext);
console.log(newtext);
console.log(newtext == "Hitesh");
console.log(typeof newtext);
