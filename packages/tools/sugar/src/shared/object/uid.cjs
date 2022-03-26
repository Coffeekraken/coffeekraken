var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
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
var uid_exports = {};
__export(uid_exports, {
  default: () => uid_default
});
module.exports = __toCommonJS(uid_exports);
var import_object = __toESM(require("../crypt/object"), 1);
var import_crypto = __toESM(require("crypto"), 1);
function uid(obj, settings = {}) {
  settings = __spreadValues({
    format: "sha256",
    key: "sugar.js.object.uid"
  }, settings);
  let uid2 = "";
  uid2 = import_object.default.encrypt(obj, settings.key);
  switch (settings.format.toLowerCase()) {
    case "full":
      return uid2;
      break;
    case "sha256":
    default:
      const hash = import_crypto.default.createHash("sha256").update(uid2).digest("hex").toString();
      return hash;
      break;
  }
}
var uid_default = uid;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
