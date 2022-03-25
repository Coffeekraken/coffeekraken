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
var base64_exports = {};
__export(base64_exports, {
  default: () => base64_default
});
module.exports = __toCommonJS(base64_exports);
var import_toString = __toESM(require("../string/toString"));
var import_parse = __toESM(require("../string/parse"));
var import_btoa = __toESM(require("btoa"));
var import_atob = __toESM(require("atob"));
var base64_default = {
  encrypt: function(message) {
    if (typeof message !== "string")
      message = (0, import_toString.default)(message);
    return (0, import_btoa.default)(message);
  },
  decrypt: function(message) {
    message = (0, import_atob.default)(message);
    return (0, import_parse.default)(message);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
