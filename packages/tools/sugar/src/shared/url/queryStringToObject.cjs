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
var queryStringToObject_exports = {};
__export(queryStringToObject_exports, {
  default: () => queryStringToObject_default
});
module.exports = __toCommonJS(queryStringToObject_exports);
var import_ltrim = __toESM(require("../string/ltrim"), 1);
function queryStringToObject(str) {
  str = (0, import_ltrim.default)(str, "?");
  str = str.replace(/%20/gm, " ");
  str = decodeURIComponent(str);
  let chunks = str.split("&");
  const obj = {};
  chunks = chunks.filter((ch) => {
    return ch !== "";
  });
  for (let c = 0; c < chunks.length; c++) {
    const split = chunks[c].split("=", 2);
    obj[split[0]] = split[1];
  }
  return obj;
}
var queryStringToObject_default = queryStringToObject;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
