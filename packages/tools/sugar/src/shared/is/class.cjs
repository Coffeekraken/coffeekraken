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
var class_exports = {};
__export(class_exports, {
  default: () => class_default
});
module.exports = __toCommonJS(class_exports);
var import_is_class = __toESM(require("is-class"), 1);
function cls(cls2) {
  if (!Array.isArray(cls2))
    cls2 = [cls2];
  for (let i = 0; i < cls2.length; i++) {
    if (!(0, import_is_class.default)(cls2[i]))
      return false;
  }
  return true;
}
var class_default = cls;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
