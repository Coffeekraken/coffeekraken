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
var propertyProxy_exports = {};
__export(propertyProxy_exports, {
  default: () => propertyProxy_default
});
module.exports = __toCommonJS(propertyProxy_exports);
var import_get = __toESM(require("lodash/get"));
function propertyProxy(obj, property, descriptor, applySetterAtStart = false) {
  const objPath = property.split(".").slice(0, -1).join(".");
  if (objPath) {
    property = property.split(".").pop();
    obj = (0, import_get.default)(obj, objPath);
  }
  let val = (0, import_get.default)(obj, property);
  const currentDescriptor = Object.getOwnPropertyDescriptor(obj.prototype || obj, property);
  const _set = (value) => {
    if (descriptor.set) {
      value = descriptor.set(value);
    }
    if (currentDescriptor && currentDescriptor.set) {
      const ret = currentDescriptor.set(value);
      if (ret) {
        val = ret;
      } else {
        val = currentDescriptor.get();
      }
    } else {
      val = value;
    }
  };
  if (applySetterAtStart)
    _set(val);
  const d = Object.getOwnPropertyDescriptor(obj, property);
  Object.defineProperty(obj, property, {
    get: () => {
      let _val = val;
      if (descriptor.get) {
        _val = descriptor.get(_val);
      }
      if (currentDescriptor && currentDescriptor.get) {
        _val = currentDescriptor.get();
      }
      return _val;
    },
    set: (v) => {
      _set(v);
    },
    configurable: descriptor.configurable !== void 0 ? descriptor.configurable : currentDescriptor && currentDescriptor.configurable !== void 0 ? currentDescriptor.configurable : false,
    enumarable: descriptor.enumarable !== void 0 ? descriptor.enumarable : currentDescriptor && currentDescriptor.enumarable !== void 0 ? currentDescriptor.enumarable : true
  });
  return val;
}
var propertyProxy_default = propertyProxy;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
