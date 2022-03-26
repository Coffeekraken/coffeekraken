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
var unzip_exports = {};
__export(unzip_exports, {
  default: () => unzip
});
module.exports = __toCommonJS(unzip_exports);
var import_fs = __toESM(require("fs"), 1);
var import_unzipper = __toESM(require("unzipper"), 1);
var import_folderPath = __toESM(require("../fs/folderPath"), 1);
var import_filename = __toESM(require("../fs/filename"), 1);
var import_s_duration = __toESM(require("@coffeekraken/s-duration"), 1);
function unzip(zipFilePath, settings) {
  return new Promise((resolve, reject) => {
    settings = __spreadValues({}, settings != null ? settings : {});
    if (!import_fs.default.existsSync(zipFilePath)) {
      throw new Error(`The passed file "${zipFilePath}" does not exists...`);
    }
    const duration = new import_s_duration.default();
    const folderName = (0, import_filename.default)(zipFilePath).replace(/\.g?zip$/, "");
    let dest = settings.dest ? `${settings.dest}/${folderName}` : `${(0, import_folderPath.default)(zipFilePath)}/${folderName}`;
    import_fs.default.createReadStream(zipFilePath).pipe(import_unzipper.default.Extract({ path: dest })).on("close", () => {
      if (!import_fs.default.existsSync(dest)) {
        throw new Error(`Something went wrong during the unzip process of the file "${zipFilePath}"...`);
      }
      resolve(__spreadValues({
        dest
      }, duration.end()));
    });
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
