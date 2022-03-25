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
var relative_exports = {};
__export(relative_exports, {
  default: () => relative_default
});
module.exports = __toCommonJS(relative_exports);
var import_glob = __toESM(require("../../shared/is/glob"));
var import_path = __toESM(require("../../shared/is/path"));
var import_path2 = __toESM(require("path"));
var import_packageRootDir = __toESM(require("./packageRootDir"));
function relative(path, from = (0, import_packageRootDir.default)(), settings = {}) {
  settings = __spreadValues({
    glob: true,
    absolute: true
  }, settings);
  const isArray = Array.isArray(path);
  if (!isArray)
    path = [path];
  path = path.map((p) => {
    if ((0, import_glob.default)(p)) {
      if (settings.glob)
        return import_path2.default.relative(from, p);
      return p;
    } else if (import_path2.default.isAbsolute(p)) {
      if (settings.absolute)
        return import_path2.default.relative(from, p);
      return p;
    } else if ((0, import_path.default)(p))
      return import_path2.default.relative(from, p);
    return p;
  });
  if (isArray)
    return path;
  return path[0];
}
var relative_default = relative;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
