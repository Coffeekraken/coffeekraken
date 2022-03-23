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
var sTypeRegisterDefaultDescriptors_exports = {};
__export(sTypeRegisterDefaultDescriptors_exports, {
  default: () => sTypeRegisterDefaultDescriptors_default
});
module.exports = __toCommonJS(sTypeRegisterDefaultDescriptors_exports);
var import_SType = __toESM(require("./_SType"), 1);
var import_stringTypeDescriptor = __toESM(require("./descriptors/stringTypeDescriptor"), 1);
var import_mapTypeDescriptor = __toESM(require("./descriptors/mapTypeDescriptor"), 1);
var import_objectTypeDescriptor = __toESM(require("./descriptors/objectTypeDescriptor"), 1);
var import_arrayTypeDescriptor = __toESM(require("./descriptors/arrayTypeDescriptor"), 1);
var import_integerTypeDescriptor = __toESM(require("./descriptors/integerTypeDescriptor"), 1);
var import_numberTypeDescriptor = __toESM(require("./descriptors/numberTypeDescriptor"), 1);
var import_booleanTypeDescriptor = __toESM(require("./descriptors/booleanTypeDescriptor"), 1);
var import_undefinedTypeDescriptor = __toESM(require("./descriptors/undefinedTypeDescriptor"), 1);
var import_nullTypeDescriptor = __toESM(require("./descriptors/nullTypeDescriptor"), 1);
var import_symbolTypeDescriptor = __toESM(require("./descriptors/symbolTypeDescriptor"), 1);
var import_bigintTypeDescriptor = __toESM(require("./descriptors/bigintTypeDescriptor"), 1);
var import_dateTypeDescriptor = __toESM(require("./descriptors/dateTypeDescriptor"), 1);
var import_functionTypeDescriptor = __toESM(require("./descriptors/functionTypeDescriptor"), 1);
var import_weakmapTypeDescriptor = __toESM(require("./descriptors/weakmapTypeDescriptor"), 1);
var import_weaksetTypeDescriptor = __toESM(require("./descriptors/weaksetTypeDescriptor"), 1);
var import_setTypeDescriptor = __toESM(require("./descriptors/setTypeDescriptor"), 1);
var import_classTypeDescriptor = __toESM(require("./descriptors/classTypeDescriptor"), 1);
import_SType.default.registerType(import_stringTypeDescriptor.default);
import_SType.default.registerType(import_mapTypeDescriptor.default);
import_SType.default.registerType(import_objectTypeDescriptor.default);
import_SType.default.registerType(import_arrayTypeDescriptor.default);
import_SType.default.registerType(import_integerTypeDescriptor.default);
import_SType.default.registerType(import_numberTypeDescriptor.default);
import_SType.default.registerType(import_booleanTypeDescriptor.default);
import_SType.default.registerType(import_undefinedTypeDescriptor.default);
import_SType.default.registerType(import_nullTypeDescriptor.default);
import_SType.default.registerType(import_symbolTypeDescriptor.default);
import_SType.default.registerType(import_bigintTypeDescriptor.default);
import_SType.default.registerType(import_dateTypeDescriptor.default);
import_SType.default.registerType(import_functionTypeDescriptor.default);
import_SType.default.registerType(import_weakmapTypeDescriptor.default);
import_SType.default.registerType(import_weaksetTypeDescriptor.default);
import_SType.default.registerType(import_setTypeDescriptor.default);
import_SType.default.registerType(import_classTypeDescriptor.default);
var sTypeRegisterDefaultDescriptors_default = import_SType.default;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
