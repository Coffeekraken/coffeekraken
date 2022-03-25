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
var replacePathTokens_exports = {};
__export(replacePathTokens_exports, {
  default: () => replacePathTokens
});
module.exports = __toCommonJS(replacePathTokens_exports);
var import_packageTmpDir = __toESM(require("./packageTmpDir"));
var import_packageLocalDir = __toESM(require("./packageLocalDir"));
var import_packageCacheDir = __toESM(require("./packageCacheDir"));
var import_packageRootDir = __toESM(require("./packageRootDir"));
var import_srcRootDir = __toESM(require("./srcRootDir"));
var import_distRootDir = __toESM(require("./distRootDir"));
var import_srcJsDir = __toESM(require("./srcJsDir"));
var import_srcCssDir = __toESM(require("./srcCssDir"));
var import_srcDocDir = __toESM(require("./srcDocDir"));
var import_srcFontsDir = __toESM(require("./srcFontsDir"));
var import_srcIconsDir = __toESM(require("./srcIconsDir"));
var import_srcImgDir = __toESM(require("./srcImgDir"));
var import_srcNodeDir = __toESM(require("./srcNodeDir"));
var import_srcViewsDir = __toESM(require("./srcViewsDir"));
var import_distJsDir = __toESM(require("./distJsDir"));
var import_distCssDir = __toESM(require("./distCssDir"));
var import_distDocDir = __toESM(require("./distDocDir"));
var import_distFontsDir = __toESM(require("./distFontsDir"));
var import_distIconsDir = __toESM(require("./distIconsDir"));
var import_distImgDir = __toESM(require("./distImgDir"));
var import_distNodeDir = __toESM(require("./distNodeDir"));
var import_distViewsDir = __toESM(require("./distViewsDir"));
function replacePathTokens(paths, settings) {
  const set = __spreadValues({
    packageTmpDir: true,
    packageLocalDir: true,
    packageCacheDir: true,
    packageRootDir: true,
    srcRootDir: true,
    distRootDir: true,
    srcJsDir: true,
    srcCssDir: true,
    srcDocDir: true,
    srcFontsDir: true,
    srcIconsDir: true,
    srcImgDir: true,
    srcNodeDir: true,
    srcViewsDir: true,
    distJsDir: true,
    distCssDir: true,
    distDocDir: true,
    distFontsDir: true,
    distIconsDir: true,
    distImgDir: true,
    distNodeDir: true,
    distViewsDir: true
  }, settings);
  const isArray = Array.isArray(paths);
  if (!isArray)
    paths = [paths];
  const finalPaths = paths.map((path) => {
    if (set.packageTmpDir)
      path = path.replace("%packageTmpDir", (0, import_packageTmpDir.default)());
    if (set.packageLocalDir)
      path = path.replace("%packageLocalDir", (0, import_packageLocalDir.default)());
    if (set.packageCacheDir)
      path = path.replace("%packageCacheDir", (0, import_packageCacheDir.default)());
    if (set.packageRootDir)
      path = path.replace("%packageRootDir", (0, import_packageRootDir.default)());
    if (set.srcRootDir)
      path = path.replace("%srcRootDir", (0, import_srcRootDir.default)());
    if (set.distRootDir)
      path = path.replace("%distRootDir", (0, import_distRootDir.default)());
    if (set.srcJsDir)
      path = path.replace("%srcJsDir", (0, import_srcJsDir.default)());
    if (set.srcCssDir)
      path = path.replace("%srcCssDir", (0, import_srcCssDir.default)());
    if (set.srcDocDir)
      path = path.replace("%srcDocDir", (0, import_srcDocDir.default)());
    if (set.srcFontsDir)
      path = path.replace("%srcFontsDir", (0, import_srcFontsDir.default)());
    if (set.srcIconsDir)
      path = path.replace("%srcIconsDir", (0, import_srcIconsDir.default)());
    if (set.srcImgDir)
      path = path.replace("%srcImgDir", (0, import_srcImgDir.default)());
    if (set.srcNodeDir)
      path = path.replace("%srcNodeDir", (0, import_srcNodeDir.default)());
    if (set.srcViewsDir)
      path = path.replace("%srcViewsDir", (0, import_srcViewsDir.default)());
    if (set.distJsDir)
      path = path.replace("%distJsDir", (0, import_distJsDir.default)());
    if (set.distCssDir)
      path = path.replace("%distCssDir", (0, import_distCssDir.default)());
    if (set.distDocDir)
      path = path.replace("%distDocDir", (0, import_distDocDir.default)());
    if (set.distFontsDir)
      path = path.replace("%distFontsDir", (0, import_distFontsDir.default)());
    if (set.distIconsDir)
      path = path.replace("%distIconsDir", (0, import_distIconsDir.default)());
    if (set.distImgDir)
      path = path.replace("%distImgDir", (0, import_distImgDir.default)());
    if (set.distNodeDir)
      path = path.replace("%distNodeDir", (0, import_distNodeDir.default)());
    if (set.distViewsDir)
      path = path.replace("%distViewsDir", (0, import_distViewsDir.default)());
    path = path.replace(/\/\//gm, "/");
    return path;
  });
  if (isArray)
    return finalPaths;
  else
    return finalPaths[0];
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
