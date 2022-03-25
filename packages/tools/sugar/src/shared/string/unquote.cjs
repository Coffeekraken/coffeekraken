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
var unquote_exports = {};
__export(unquote_exports, {
  default: () => unquote_default
});
module.exports = __toCommonJS(unquote_exports);
function unquote(string, quotesToRemove = ['"', "'", "\u201D", "`"]) {
  string = string.trim();
  quotesToRemove.forEach((quote) => {
    if (string.substr(0, 1) === quote && string.substr(-1) === quote) {
      string = string.substr(1);
      string = string.substr(0, string.length - 1);
      return;
    }
  });
  return string;
}
var unquote_default = unquote;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
