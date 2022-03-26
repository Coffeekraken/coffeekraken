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
  ISLog: () => import_ISLog.default,
  ISLogAsk: () => import_ISLogAsk.default,
  default: () => exports_default
});
module.exports = __toCommonJS(exports_exports);
var import_SLog = __toESM(require("./SLog"), 1);
var import_ISLog = __toESM(require("./ISLog"), 1);
var import_ISLogAsk = __toESM(require("./ISLogAsk"), 1);
__reExport(exports_exports, require("./ISLog"), module.exports);
var exports_default = import_SLog.default;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ISLog,
  ISLogAsk
});
