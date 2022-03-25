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
var isInPackage_exports = {};
__export(isInPackage_exports, {
  default: () => isInPackage_default
});
module.exports = __toCommonJS(isInPackage_exports);
var import_packageRootDir = __toESM(require("./packageRootDir"));
var import_fs = __toESM(require("fs"));
var import_readJsonSync = __toESM(require("@coffeekraken/sugar/node/fs/readJsonSync"));
function isInPackage(name, from = process.cwd(), highest = false) {
  const packageRootDir = (0, import_packageRootDir.default)(from);
  if (!packageRootDir)
    return false;
  if (!import_fs.default.existsSync(`${packageRootDir}/package.json`))
    return false;
  const pkg = (0, import_readJsonSync.default)(`${packageRootDir}/package.json`);
  let names = name;
  if (typeof names === "string")
    names = names.split(",").map((f) => f.trim());
  for (let i = 0; i < names.length; i++) {
    if (names[i] === pkg.name) {
      return true;
    }
  }
  const newPath = packageRootDir.split("/").slice(0, -1).join("/");
  if (highest) {
    return isInPackage(name, newPath, highest);
  }
  return false;
}
var isInPackage_default = isInPackage;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
