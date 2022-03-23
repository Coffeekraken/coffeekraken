import "../../../../../chunk-JETN4ZEY.mjs";
import sha256 from "crypto-js/sha256";
import toString from "../string/toString";
import parse from "../string/parse";
const __encryptedMessages = {};
var sha256_default = {
  encrypt: function(message) {
    if (typeof message !== "string")
      message = toString(message);
    const string = sha256(message).toString();
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
  sha256_default as default
};
