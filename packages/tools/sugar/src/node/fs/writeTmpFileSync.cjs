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
var writeTmpFileSync_exports = {};
__export(writeTmpFileSync_exports, {
  default: () => writeTmpFileSync_default
});
module.exports = __toCommonJS(writeTmpFileSync_exports);
var import_writeFileSync = __toESM(require("./writeFileSync"), 1);
var import_path = __toESM(require("path"), 1);
var import_uniqid = __toESM(require("../../shared/string/uniqid"), 1);
var import_packageTmpDir = __toESM(require("../path/packageTmpDir"), 1);
function writeTmpFileSync(data, settings = {}) {
  var _a;
  settings = __spreadValues({
    path: void 0
  }, settings);
  let path = import_path.default.resolve((0, import_packageTmpDir.default)(), "files", (_a = settings.path) != null ? _a : (0, import_uniqid.default)() + ".tmp");
  (0, import_writeFileSync.default)(path, data);
  return path;
}
var writeTmpFileSync_default = writeTmpFileSync;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
