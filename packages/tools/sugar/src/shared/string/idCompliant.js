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
var idCompliant_exports = {};
__export(idCompliant_exports, {
  default: () => idCompliant
});
module.exports = __toCommonJS(idCompliant_exports);
var import_simplifySpecialChars = __toESM(require("./simplifySpecialChars"), 1);
function idCompliant(str, settings) {
  settings = __spreadValues({
    exclude: []
  }, settings != null ? settings : {});
  str = str.replace(" ", "-");
  str = (0, import_simplifySpecialChars.default)(str);
  const dict = {
    "/": "-",
    "@": "",
    ".": "-",
    ",": "-",
    "\\": "-",
    "(": "-",
    ")": "-",
    "{": "-",
    "}": "-",
    "[": "-",
    "]": "-",
    "=": "-",
    "?": "-",
    "!": "-",
    "&": "-",
    "%": "-",
    "*": "-",
    '"': "-",
    "'": "-",
    "`": "-",
    "+": "-",
    "\xB0": "-",
    $: "-",
    "<": "-",
    ">": "-",
    ":": "-",
    "#": "-"
  };
  settings.exclude.forEach((char) => {
    delete dict[char];
  });
  Object.keys(dict).forEach((char) => {
    str = str.split(char).join(dict[char]);
  });
  str = str.replace(/\.{2,999}/gm, ".");
  str = str.replace(/^-{1,999}/gm, "");
  str = str.replace(/-{1,999}$/gm, "");
  str = str.replace(/-{2,999}/gm, "-");
  str = str.replace(/[^a-zA-Z0-9]{1,999}$/, "");
  str = str.replace(/^[^a-zA-Z0-9]{1,999}/, "");
  str = str.toLowerCase();
  return str;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
