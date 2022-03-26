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
var simplify_exports = {};
__export(simplify_exports, {
  default: () => simplify_default
});
module.exports = __toCommonJS(simplify_exports);
var import_deepMerge = __toESM(require("../object/deepMerge"), 1);
function simplify(string, settings = {}) {
  settings = (0, import_deepMerge.default)({
    specialChars: true,
    lowerCase: true,
    dashSpace: true,
    trim: true
  }, settings);
  if (string == null)
    return "";
  const map = {
    A: "\xC0|\xC1|\xC3|\xC2|\xC4",
    a: "\xE1|\xE0|\xE3|\xE2|\xE4",
    E: "\xC9|\xC8|\xCA|\xCB",
    e: "\xE9|\xE8|\xEA|\xEB",
    I: "\xCD|\xCC|\xCE|\xCF",
    i: "\xED|\xEC|\xEE|\xEF",
    O: "\xD3|\xD2|\xD4|\xD5|\xD6",
    o: "\xF3|\xF2|\xF4|\xF5|\xF6",
    U: "\xDA|\xD9|\xDB|\xDC|\xDC",
    u: "\xFA|\xF9|\xFB|\xFC|\xFC",
    C: "\xC7",
    c: "\xE7",
    N: "\xD1",
    n: "\xF1"
  };
  if (settings.dashSpace) {
    map[" "] = "_|-";
  }
  if (settings.lowerCase) {
    string = string.toLowerCase();
  }
  if (settings.specialChars) {
    for (const pattern in map) {
      string = string.replace(new RegExp(map[pattern], "g"), pattern);
    }
  }
  if (settings.trim)
    string = string.trim();
  return string;
}
var simplify_default = simplify;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
