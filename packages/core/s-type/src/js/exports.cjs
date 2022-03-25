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
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var exports_exports = {};
__export(exports_exports, {
  STypeResult: () => import_STypeResult.default,
  default: () => exports_default,
  parseTypeString: () => import_parseTypeString.default
});
module.exports = __toCommonJS(exports_exports);
var import_SType = __toESM(require("../shared/SType"));
var import_STypeResult = __toESM(require("../shared/STypeResult"));
var import_parseTypeString = __toESM(require("../shared/utils/parseTypeString"));
__reExport(exports_exports, require("../shared/SType"), module.exports);
__reExport(exports_exports, require("../shared/STypeResult"), module.exports);
var exports_default = import_SType.default;
