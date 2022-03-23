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
var findPackages_exports = {};
__export(findPackages_exports, {
  default: () => findPackages
});
module.exports = __toCommonJS(findPackages_exports);
var import_glob = __toESM(require("glob"), 1);
var import_readJsonSync = __toESM(require("@coffeekraken/sugar/node/fs/readJsonSync"), 1);
async function findPackages(rootDir = process.cwd()) {
  const packagesObj = {};
  const packagesPaths = import_glob.default.sync("**/package.json", {
    cwd: rootDir,
    ignore: "**/node_modules/**"
  }).filter((path) => path !== "package.json");
  packagesPaths.forEach((path) => {
    const folder = path.split("/").slice(0, -1).join("/");
    packagesObj[folder] = (0, import_readJsonSync.default)(`${rootDir}/${path}`);
  });
  return packagesObj;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
