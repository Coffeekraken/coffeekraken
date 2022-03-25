var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
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
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
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
var packageJsonMiddleware_exports = {};
__export(packageJsonMiddleware_exports, {
  default: () => packageJsonMiddleware_default
});
module.exports = __toCommonJS(packageJsonMiddleware_exports);
var import_packageRootDir = __toESM(require("@coffeekraken/sugar/node/path/packageRootDir"));
var import_fs = __toESM(require("fs"));
var import_standardizeJson = __toESM(require("@coffeekraken/sugar/shared/npm/utils/standardizeJson"));
var import_s_bench = __toESM(require("@coffeekraken/s-bench"));
var import_readJsonSync = __toESM(require("@coffeekraken/sugar/node/fs/readJsonSync"));
function packageJsonMiddleware(settings = {}) {
  return function(req, res, next) {
    const packageJsonPath = `${(0, import_packageRootDir.default)()}/package.json`;
    let pkg;
    if (!import_fs.default.existsSync(packageJsonPath)) {
    } else {
      pkg = (0, import_readJsonSync.default)(packageJsonPath);
      res.templateData = __spreadProps(__spreadValues({}, res.templateData || {}), {
        packageJson: (0, import_standardizeJson.default)(pkg)
      });
    }
    import_s_bench.default.step("request", "packageJsonMiddleware");
    return next();
  };
}
var packageJsonMiddleware_default = packageJsonMiddleware;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
