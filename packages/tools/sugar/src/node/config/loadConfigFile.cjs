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
var loadConfigFile_exports = {};
__export(loadConfigFile_exports, {
  default: () => loadConfigFile
});
module.exports = __toCommonJS(loadConfigFile_exports);
var import_packageRoot = __toESM(require("../path/packageRoot"), 1);
var import_path = __toESM(require("path"), 1);
var import_yaml = __toESM(require("yaml"), 1);
var import_fs = __toESM(require("fs"), 1);
async function loadConfigFile(filePath, settings) {
  const finalSettings = __spreadValues({
    rootDir: (0, import_packageRoot.default)(),
    throw: false
  }, settings != null ? settings : {});
  const filePathArray = Array.isArray(filePath) ? filePath : [filePath];
  let finalFilePath;
  for (let i = 0; i < filePathArray.length; i++) {
    if (import_fs.default.existsSync(import_path.default.resolve(finalSettings.rootDir, filePathArray[i]))) {
      finalFilePath = filePathArray[i];
      break;
    }
  }
  if (finalSettings.throw && !finalFilePath) {
    throw new Error(`Sorry but none of the passed config files "${filePathArray.join(",")}" does exists...`);
  } else if (!finalFilePath)
    return;
  const extension = finalFilePath.split(".").pop();
  switch (extension) {
    case "js":
    case "json":
      return (await Promise.resolve().then(() => __toESM(require(import_path.default.resolve(finalSettings.rootDir, finalFilePath))))).default;
      break;
    case "yml":
      const str = import_fs.default.readFileSync(import_path.default.resolve(finalSettings.rootDir, finalFilePath), "utf8").toString();
      return import_yaml.default.parse(str);
      break;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
