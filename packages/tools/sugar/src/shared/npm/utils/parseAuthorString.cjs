var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var parseAuthorString_exports = {};
__export(parseAuthorString_exports, {
  default: () => parseAuthorString_default
});
module.exports = __toCommonJS(parseAuthorString_exports);
function parseAuthorString(string) {
  const reg = /(.*)\s?<(.*)>\s?\((.*)\)/gm;
  const matches = reg.exec(string.trim());
  const authorObj = {};
  if (matches) {
    if (matches[1]) {
      authorObj.name = matches[1].trim();
    }
    if (matches[2]) {
      authorObj.email = matches[2].trim();
    }
    if (matches[3]) {
      authorObj.url = matches[3].trim();
    }
  }
  return authorObj;
}
var parseAuthorString_default = parseAuthorString;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
