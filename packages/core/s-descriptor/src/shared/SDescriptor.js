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
var SDescriptor_exports = {};
__export(SDescriptor_exports, {
  default: () => SDescriptor_default
});
module.exports = __toCommonJS(SDescriptor_exports);
var import_SDescriptor = __toESM(require("./_SDescriptor"), 1);
var import_requiredRule = __toESM(require("./rules/requiredRule"), 1);
var import_typeRule = __toESM(require("./rules/typeRule"), 1);
var import_minRule = __toESM(require("./rules/minRule"), 1);
var import_maxRule = __toESM(require("./rules/maxRule"), 1);
__reExport(SDescriptor_exports, require("./_SDescriptor"), module.exports);
import_SDescriptor.default.registerRule(import_requiredRule.default);
import_SDescriptor.default.registerRule(import_typeRule.default);
import_SDescriptor.default.registerRule(import_minRule.default);
import_SDescriptor.default.registerRule(import_maxRule.default);
var SDescriptor_default = import_SDescriptor.default;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
