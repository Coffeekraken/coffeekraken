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
var rtrim_exports = {};
__export(rtrim_exports, {
  default: () => rtrim_default
});
module.exports = __toCommonJS(rtrim_exports);
function rtrim(string, needle, trimResult = true) {
  if (string.substr(needle.length * -1) === needle) {
    if (trimResult) {
      return string.substr(0, string.length - needle.length).trim();
    } else {
      return string.substr(0, string.length - needle.length);
    }
  }
  return string;
}
var rtrim_default = rtrim;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
