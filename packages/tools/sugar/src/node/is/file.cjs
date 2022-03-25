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
var file_exports = {};
__export(file_exports, {
  default: () => file_default
});
module.exports = __toCommonJS(file_exports);
var import_fs = __toESM(require("fs"));
var import_deepMerge = __toESM(require("../../shared/object/deepMerge"));
function isFile(path, settings = {}) {
  settings = (0, import_deepMerge.default)({
    symlink: true
  }, settings);
  let isMatching = import_fs.default.existsSync(path);
  if (!isMatching)
    return false;
  if (settings.symlink && import_fs.default.lstatSync(path).isSymbolicLink()) {
    const realPath = import_fs.default.realpathSync(path);
    isMatching = isMatching && import_fs.default.lstatSync(realPath).isFile();
  } else {
    isMatching = isMatching && import_fs.default.lstatSync(path).isFile();
  }
  return isMatching;
}
var file_default = isFile;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
