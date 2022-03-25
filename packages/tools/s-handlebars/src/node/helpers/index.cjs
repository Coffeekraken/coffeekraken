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
var helpers_exports = {};
__export(helpers_exports, {
  configFileNameFromDocmapPath: () => import_configFileNameFromDocmapPath.default,
  configFiles: () => import_configFiles.default,
  configFromDocmap: () => import_configFromDocmap.default,
  configValue: () => import_configValue.default,
  get: () => import_get.default,
  ifEqual: () => import_ifEqual.default,
  ifMatch: () => import_ifMatch.default,
  import: () => import_import.default,
  includes: () => import_includes.default,
  isLicense: () => import_isLicense.default,
  isSectionWanted: () => import_isSectionWanted.default,
  jsonStringify: () => import_jsonStringify.default,
  length: () => import_length.default,
  replace: () => import_replace.default,
  rootRelative: () => import_rootRelative.default,
  sanitizeValue: () => import_sanitizeValue.default,
  sfile: () => import_sfile.default,
  shieldsioHandlebarsHelper: () => import_shieldsioHandlebarsHelper.default
});
module.exports = __toCommonJS(helpers_exports);
var import_configFileNameFromDocmapPath = __toESM(require("./configFileNameFromDocmapPath"));
var import_configFiles = __toESM(require("./configFiles"));
var import_configFromDocmap = __toESM(require("./configFromDocmap"));
var import_configValue = __toESM(require("./configValue"));
var import_get = __toESM(require("./get"));
var import_import = __toESM(require("./import"));
var import_includes = __toESM(require("./includes"));
var import_ifEqual = __toESM(require("./ifEqual"));
var import_replace = __toESM(require("./replace"));
var import_ifMatch = __toESM(require("./ifMatch"));
var import_isLicense = __toESM(require("./isLicense"));
var import_isSectionWanted = __toESM(require("./isSectionWanted"));
var import_jsonStringify = __toESM(require("./jsonStringify"));
var import_rootRelative = __toESM(require("./rootRelative"));
var import_sanitizeValue = __toESM(require("./sanitizeValue"));
var import_sfile = __toESM(require("./sfile"));
var import_shieldsioHandlebarsHelper = __toESM(require("./shieldsioHandlebarsHelper"));
var import_length = __toESM(require("./length"));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  configFileNameFromDocmapPath,
  configFiles,
  configFromDocmap,
  configValue,
  get,
  ifEqual,
  ifMatch,
  import: null,
  includes,
  isLicense,
  isSectionWanted,
  jsonStringify,
  length,
  replace,
  rootRelative,
  sanitizeValue,
  sfile,
  shieldsioHandlebarsHelper
});
