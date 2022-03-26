var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var md5_exports = {};
__export(md5_exports, {
  default: () => md5_default
});
module.exports = __toCommonJS(md5_exports);
var import_md5 = __toESM(require("crypto-js/md5"), 1);
var import_toString = __toESM(require("../string/toString"), 1);
var import_parse = __toESM(require("../string/parse"), 1);
const __encryptedMessages = {};
var md5_default = {
  encrypt: function(message) {
    if (typeof message !== "string")
      message = (0, import_toString.default)(message);
    const string = (0, import_md5.default)(message).toString();
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
    return (0, import_parse.default)(string);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
