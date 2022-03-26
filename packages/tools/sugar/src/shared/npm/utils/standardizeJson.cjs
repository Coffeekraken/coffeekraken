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
var standardizeJson_exports = {};
__export(standardizeJson_exports, {
  default: () => standardizeJson_default
});
module.exports = __toCommonJS(standardizeJson_exports);
var import_parseAuthorString = __toESM(require("./parseAuthorString"), 1);
function standardizeJson(json) {
  if (json.author && typeof json.author === "string") {
    json.author = (0, import_parseAuthorString.default)(json.author);
  } else if (json.author && Array.isArray(json.author)) {
    json.author = json.author.map((string) => {
      if (typeof string === "string") {
        return (0, import_parseAuthorString.default)(string);
      }
      return string;
    });
  }
  if (json.contributors && typeof json.contributors === "string") {
    json.contributors = (0, import_parseAuthorString.default)(json.contributors);
  } else if (json.contributors && Array.isArray(json.contributors)) {
    json.contributors = json.contributors.map((string) => {
      if (typeof string === "string") {
        return (0, import_parseAuthorString.default)(string);
      }
      return string;
    });
  }
  return json;
}
var standardizeJson_default = standardizeJson;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
