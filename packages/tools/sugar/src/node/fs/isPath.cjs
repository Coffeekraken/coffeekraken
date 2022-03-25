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
var isPath_exports = {};
__export(isPath_exports, {
  default: () => isPath_default
});
module.exports = __toCommonJS(isPath_exports);
var import_is_valid_path = __toESM(require("is-valid-path"));
var import_fs = __toESM(require("fs"));
function isPath(path, checkExistence = false) {
  if (typeof path !== "string")
    return false;
  if (path.trim() === "")
    return false;
  if (path.split("\n").length > 1)
    return false;
  if (!path.includes("/")) {
    if (!path.includes("."))
      return false;
  }
  if (!(0, import_is_valid_path.default)(path))
    return false;
  if (checkExistence) {
    if (!import_fs.default.existsSync(path))
      return false;
  }
  return true;
}
var isPath_default = isPath;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
