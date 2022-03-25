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
  SCommandProcess: () => import_SCommandProcess.default,
  SProcessInterface: () => import_SProcessInterface.default,
  SProcessManager: () => import_SProcessManager.default,
  default: () => exports_default
});
module.exports = __toCommonJS(exports_exports);
var import_SProcess = __toESM(require("./SProcess"));
var import_SProcessManager = __toESM(require("./SProcessManager"));
var import_SProcessInterface = __toESM(require("./interface/SProcessInterface"));
var import_SCommandProcess = __toESM(require("./SCommandProcess"));
__reExport(exports_exports, require("./SProcessManager"), module.exports);
__reExport(exports_exports, require("./SCommandProcess"), module.exports);
__reExport(exports_exports, require("./SProcess"), module.exports);
__reExport(exports_exports, require("./ISProcess"), module.exports);
var exports_default = import_SProcess.default;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SCommandProcess,
  SProcessInterface,
  SProcessManager
});
