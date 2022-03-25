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
var execPhp_exports = {};
__export(execPhp_exports, {
  default: () => execPhp
});
module.exports = __toCommonJS(execPhp_exports);
var import_child_process = __toESM(require("child_process"));
var import_base64 = __toESM(require("@coffeekraken/sugar/shared/crypt/base64"));
var import_uniqid = __toESM(require("@coffeekraken/sugar/shared/string/uniqid"));
var import_packageTmpDir = __toESM(require("@coffeekraken/sugar/node/path/packageTmpDir"));
var import_writeJsonSync = __toESM(require("@coffeekraken/sugar/node/fs/writeJsonSync"));
function execPhp(scriptPath, params, settings) {
  return new Promise((resolve, reject) => {
    settings = __spreadValues({
      encryptParams: false,
      paramsThroughFile: false
    }, settings != null ? settings : {});
    let paramsFilePath, paramsStr;
    if (settings.encryptParams) {
      paramsStr = import_base64.default.encrypt(paramsStr);
    } else if (settings.paramsThroughFile) {
      paramsFilePath = `${(0, import_packageTmpDir.default)()}/exec-php-${(0, import_uniqid.default)()}.json`;
      (0, import_writeJsonSync.default)(paramsFilePath, params);
    }
    const result = import_child_process.default.spawnSync(`php ${scriptPath} '${paramsFilePath != null ? paramsFilePath : paramsStr}'`, [], {
      shell: true
    });
    if (result.stderr.toString()) {
      return reject(result.stderr.toString());
    }
    resolve(result.stdout.toString());
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
