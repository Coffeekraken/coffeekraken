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
var ltrim_exports = {};
__export(ltrim_exports, {
  default: () => ltrim_default
});
module.exports = __toCommonJS(ltrim_exports);
function ltrim(string, needle, trimResult = true) {
  if (string.substr(0, needle.length) === needle) {
    return trimResult ? string.substr(needle.length).trim() : string.substr(needle.length);
  }
  return string;
}
var ltrim_default = ltrim;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
