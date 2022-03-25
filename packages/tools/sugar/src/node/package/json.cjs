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
var json_exports = {};
__export(json_exports, {
  default: () => json_default
});
module.exports = __toCommonJS(json_exports);
var import_rootPath = __toESM(require("./rootPath"));
var import_fs = __toESM(require("fs"));
var import_standardizeJson = __toESM(require("../../shared/npm/utils/standardizeJson"));
const __packageJson = {};
function json(from = process.cwd(), settings) {
  return new Promise(async (resolve) => {
    const finalSettings = __spreadValues({
      highest: false,
      standardize: false
    }, settings != null ? settings : {});
    const hash = __objectHash(__spreadValues({
      from
    }, finalSettings));
    if (__packageJson[hash]) {
      return resolve(__packageJson[hash]);
    }
    const path = `${(0, import_rootPath.default)(from, finalSettings.highest)}/package.json`;
    if (!import_fs.default.existsSync(path))
      return false;
    let json2 = __readJsonSync(path);
    if (finalSettings.standardize) {
      json2 = (0, import_standardizeJson.default)(json2);
    }
    if (!__packageJson[hash])
      __packageJson[hash] = json2;
    resolve(json2);
  });
}
var json_default = json;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
