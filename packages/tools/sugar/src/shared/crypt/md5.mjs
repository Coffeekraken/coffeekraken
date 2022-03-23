import "../../../../../chunk-JETN4ZEY.mjs";
import md5 from "crypto-js/md5";
import toString from "../string/toString";
import parse from "../string/parse";
const __encryptedMessages = {};
var md5_default = {
  encrypt: function(message) {
    if (typeof message !== "string")
      message = toString(message);
    const string = md5(message).toString();
    __encryptedMessages[string] = message;
    return string;
  },
  decrypt: function(message) {
    if (!__encryptedMessages[message]) {
      console.warn(`The message "${message}" cannot be decrypted...`);
      return;
    }
    const string = __encryptedMessages[message];
    delete __encryptedMessages[message];
    return parse(string);
  }
};
export {
  md5_default as default
};
