var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
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
var diff_exports = {};
__export(diff_exports, {
  default: () => diff_default
});
module.exports = __toCommonJS(diff_exports);
var import_plainObject = __toESM(require("../is/plainObject"), 1);
var import_is_equal = __toESM(require("is-equal"), 1);
function diff(object1, object2, settings = {}) {
  settings = __spreadValues({
    deep: true,
    added: true,
    deleted: false,
    equals: false,
    emptyObject: false,
    updated: true
  }, settings);
  const finalObj = {};
  const keys = Array.from(/* @__PURE__ */ new Set([...Object.keys(object1), ...Object.keys(object2)]));
  for (let i = 0; i < keys.length; i++) {
    const _prop = keys[i];
    if (settings.deep) {
      if ((0, import_plainObject.default)(object1[_prop]) && (0, import_plainObject.default)(object2[_prop])) {
        finalObj[_prop] = diff(object1[_prop], object2[_prop], settings);
        if (Object.keys(finalObj[_prop]).length === 0)
          delete finalObj[_prop];
        continue;
      }
    }
    if (settings.added) {
      if (object1[_prop] === void 0 && object2[_prop] !== void 0) {
        finalObj[_prop] = object2[_prop];
        continue;
      }
    }
    if (settings.deleted) {
      if (object1[_prop] !== void 0 && object2[_prop] === void 0) {
        finalObj[_prop] = object1[_prop];
        continue;
      }
    }
    if (settings.equals) {
      if ((0, import_is_equal.default)(object1[_prop], object2[_prop])) {
        finalObj[_prop] = object2[_prop];
        continue;
      }
    }
    if (settings.emptyObject) {
      if ((0, import_plainObject.default)(object1[_prop]) && Object.keys(object1[_prop]).length === 0) {
        finalObj[_prop] = {};
        continue;
      }
    }
    if (settings.updated) {
      if (object1[_prop] === void 0 || object2[_prop] === void 0) {
        continue;
      }
      if (!(0, import_is_equal.default)(object1[_prop], object2[_prop])) {
        finalObj[_prop] = object2[_prop];
        continue;
      }
    }
  }
  return finalObj;
}
var diff_default = diff;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
