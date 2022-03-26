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
var folderSize_exports = {};
__export(folderSize_exports, {
  default: () => folderSize_default
});
module.exports = __toCommonJS(folderSize_exports);
var import_get_folder_size = __toESM(require("get-folder-size"), 1);
var import_filesize = __toESM(require("filesize"), 1);
function folderSize(folderPath, format = {}) {
  return new Promise((resolve, reject) => {
    (0, import_get_folder_size.default)(folderPath, (error, size) => {
      if (error)
        throw error;
      resolve(format === false ? size : (0, import_filesize.default)(size, format));
    });
  });
}
var folderSize_default = folderSize;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
