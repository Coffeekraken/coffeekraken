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
var replacePackageJsonTokens_exports = {};
__export(replacePackageJsonTokens_exports, {
  default: () => replacePackageJsonTokens
});
module.exports = __toCommonJS(replacePackageJsonTokens_exports);
var import_jsonSync = __toESM(require("./jsonSync"));
var import_flatten = __toESM(require("../../shared/object/flatten"));
function replacePackageJsonTokens(string, settings) {
  const set = __spreadValues({}, settings);
  const tokensMatches = string.match(/%packageJson\.[a-zA-Z0-9\.]+;?/gm);
  if (!tokensMatches)
    return string;
  const packageJson = (0, import_jsonSync.default)();
  const flatPackageJson = (0, import_flatten.default)(packageJson, {
    array: true
  });
  tokensMatches.forEach((match) => {
    const dotPath = match.replace(/^%packageJson\./, "").replace(/;$/, "");
    const value = flatPackageJson[dotPath];
    if (value === void 0)
      return;
    string = string.replaceAll(match, value);
  });
  return string;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
