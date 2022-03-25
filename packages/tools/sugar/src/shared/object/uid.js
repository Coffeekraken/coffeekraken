var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
import __encryptObject from "../crypt/object";
import __crypto from "crypto";
function uid(obj, settings = {}) {
  settings = __spreadValues({
    format: "sha256",
    key: "sugar.js.object.uid"
  }, settings);
  let uid2 = "";
  uid2 = __encryptObject.encrypt(obj, settings.key);
  switch (settings.format.toLowerCase()) {
    case "full":
      return uid2;
      break;
    case "sha256":
    default:
      const hash = __crypto.createHash("sha256").update(uid2).digest("hex").toString();
      return hash;
      break;
  }
}
var uid_default = uid;
export {
  uid_default as default
};
