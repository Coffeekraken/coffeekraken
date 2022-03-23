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
var renamePackage_exports = {};
__export(renamePackage_exports, {
  default: () => renamePackage
});
module.exports = __toCommonJS(renamePackage_exports);
var import_readJsonSync = __toESM(require("../fs/readJsonSync"), 1);
var import_writeJsonSync = __toESM(require("../fs/writeJsonSync"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_packageRoot = __toESM(require("../path/packageRoot"), 1);
function renamePackage(newName, packagePath = (0, import_packageRoot.default)()) {
  if (!newName.match(/^[a-zA-Z0-9\/\@_-]+$/)) {
    throw new Error(`The passed name "<yellow>${newName}</yellow>" is not a valid package name. It has to follow this pattern: <cyan>/^[a-zA-Z0-9/@_-]+$/</cyan>`);
  }
  const packageJsonPath = `${packagePath}/package.json`;
  if (!import_fs.default.existsSync(packageJsonPath)) {
    throw new Error(`The package.json file doesn't exist at path: ${packageJsonPath}`);
  }
  const json = (0, import_readJsonSync.default)(packageJsonPath);
  json.name = newName;
  (0, import_writeJsonSync.default)(packageJsonPath, json);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
