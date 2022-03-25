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
var findUp_exports = {};
__export(findUp_exports, {
  default: () => findUp
});
module.exports = __toCommonJS(findUp_exports);
var import_s_file = __toESM(require("@coffeekraken/s-file"));
var import_fs = __toESM(require("fs"));
var import_glob = __toESM(require("glob"));
var import_glob2 = __toESM(require("../../shared/is/glob"));
var import_s_sugar_config = __toESM(require("@coffeekraken/s-sugar-config"));
function findUp(search, settings) {
  settings = __spreadValues({
    symlinks: true,
    cwd: process.cwd(),
    stopWhenFound: true,
    SFile: true
  }, settings);
  return new Promise(async (resolve) => {
    await import_s_sugar_config.default.load();
    const cwd = settings.cwd;
    let currentPath = cwd.split("/").filter((p) => p.trim() !== "");
    let foundedFiles = [];
    while (currentPath.length > 0) {
      const path = `/${currentPath.join("/")}`;
      if ((0, import_glob2.default)(search)) {
        let files = import_glob.default.sync(search, {
          cwd: path,
          symlinks: settings.symlinks
        });
        if (files && files.length) {
          files = files.map((f) => {
            return `${path}/${f}`;
          });
          foundedFiles = [...foundedFiles, ...files];
        }
      } else if (import_fs.default.existsSync(`${path}/${search}`)) {
        foundedFiles.push(`${path}/${search}`);
      }
      if (settings.stopWhenFound && foundedFiles.length) {
        break;
      }
      currentPath = currentPath.slice(0, -1);
    }
    if (settings.SFile === true) {
      foundedFiles = foundedFiles.map((path) => {
        return new import_s_file.default(path);
      });
    }
    return resolve(foundedFiles);
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
