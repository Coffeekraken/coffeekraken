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
var writeJsonSync_exports = {};
__export(writeJsonSync_exports, {
  default: () => writeJsonSync_default
});
module.exports = __toCommonJS(writeJsonSync_exports);
var import_folderPath = __toESM(require("./folderPath"), 1);
var import_ensureDirSync = __toESM(require("./ensureDirSync"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_stringify = __toESM(require("../../shared/json/stringify"), 1);
function writeJsonSync(path, data, options = {}) {
  const folderPath = (0, import_folderPath.default)(path);
  (0, import_ensureDirSync.default)(folderPath);
  const jsonStr = (0, import_stringify.default)(data, null, 4);
  import_fs.default.writeFileSync(path, jsonStr);
}
var writeJsonSync_default = writeJsonSync;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
