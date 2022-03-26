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
var listNodeModulesPackages_exports = {};
__export(listNodeModulesPackages_exports, {
  default: () => listNodeModulesPackages
});
module.exports = __toCommonJS(listNodeModulesPackages_exports);
var import_packageRootDir = __toESM(require("../../path/packageRootDir"), 1);
var import_glob_all = __toESM(require("glob-all"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_unique = __toESM(require("../../../shared/array/unique"), 1);
function listNodeModulesPackages(settings) {
  const finalSettings = __spreadValues({
    pathes: [`${(0, import_packageRootDir.default)()}/node_modules`],
    monorepo: false
  }, settings != null ? settings : {});
  if (finalSettings.monorepo) {
    finalSettings.pathes.push(`${(0, import_packageRootDir.default)(process.cwd(), true)}/node_modules`);
  }
  const finalPaths = [];
  finalSettings.pathes.forEach((path) => {
    finalPaths.push(`${path}/*/package.json`);
    finalPaths.push(`${path}/*/*/package.json`);
  });
  finalSettings.pathes = (0, import_unique.default)(finalSettings.pathes);
  const finalPackagesList = {};
  import_glob_all.default.sync(finalPaths).forEach((path) => {
    let packageJson;
    try {
      packageJson = JSON.parse(import_fs.default.readFileSync(path, "utf8"));
    } catch (e) {
      console.log(path.toUpperCase());
      console.log(e);
    }
    if (packageJson) {
      if (!finalPackagesList[packageJson.name]) {
        finalPackagesList[packageJson.name] = packageJson;
      }
    }
  });
  return finalPackagesList;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
