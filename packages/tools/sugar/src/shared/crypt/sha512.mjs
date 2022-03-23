import "../../../../../chunk-JETN4ZEY.mjs";
import sha512 from "crypto-js/sha512";
import toString from "../string/toString";
import parse from "../string/parse";
const __encryptedMessages = {};
var sha512_default = {
  encrypt: function(message) {
    if (typeof message !== "string")
      message = toString(message);
    const string = sha512(message).toString();
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
  sha512_default as default
};
