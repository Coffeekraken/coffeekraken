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
var sanitizeValue_exports = {};
__export(sanitizeValue_exports, {
  default: () => sanitizeValue
});
module.exports = __toCommonJS(sanitizeValue_exports);
function sanitizeValue(string) {
  var _a, _b;
  string = (_b = (_a = string == null ? void 0 : string.toString) == null ? void 0 : _a.call(string)) != null ? _b : "";
  return string.replace(/\n/gm, " ");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
