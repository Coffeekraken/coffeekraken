import "../../../../../chunk-JETN4ZEY.mjs";
import AES from "crypto-js/aes";
import utf8 from "crypto-js/enc-utf8";
import toString from "../string/toString";
import parse from "../string/parse";
var aes_default = {
  encrypt: function(message, key = "coffeekraken.sugar.crypt.aes") {
    if (typeof message !== "string")
      message = toString(message);
    return AES.encrypt(message, key).toString();
  },
  decrypt: function(message, key = "coffeekraken.sugar.crypt.aes") {
    const value = AES.decrypt(message, key).toString(utf8);
    return parse(value);
  }
};
export {
  aes_default as default
};
