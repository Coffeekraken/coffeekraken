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
var SInterface_exports = {};
__export(SInterface_exports, {
  default: () => SInterface_default
});
module.exports = __toCommonJS(SInterface_exports);
var import_SInterface = __toESM(require("../shared/SInterface"), 1);
var import_SInterfaceTerminalRenderer = __toESM(require("./renderers/SInterfaceTerminalRenderer"), 1);
__reExport(SInterface_exports, require("../shared/SInterface"), module.exports);
import_SInterface.default.registerRenderer(import_SInterfaceTerminalRenderer.default);
var SInterface_default = import_SInterface.default;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
