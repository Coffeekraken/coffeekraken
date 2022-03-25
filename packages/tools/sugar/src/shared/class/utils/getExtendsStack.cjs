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
var getExtendsStack_exports = {};
__export(getExtendsStack_exports, {
  default: () => getExtendsStack_default
});
module.exports = __toCommonJS(getExtendsStack_exports);
var import_class = __toESM(require("../../is/class"));
const fn = function(cls, settings = {}) {
  const stack = {};
  if (!(0, import_class.default)(cls)) {
    cls = cls.constructor;
  }
  if (settings.includeBaseClass === true) {
    stack[cls.name] = cls;
  }
  let baseClass = cls;
  while (baseClass) {
    const newBaseClass = Object.getPrototypeOf(baseClass);
    if (newBaseClass && newBaseClass !== Object && newBaseClass.name) {
      stack[newBaseClass.name] = newBaseClass;
      baseClass = newBaseClass;
    } else {
      break;
    }
  }
  return stack;
};
var getExtendsStack_default = fn;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
