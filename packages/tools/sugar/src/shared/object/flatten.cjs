var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
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
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
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
var flatten_exports = {};
__export(flatten_exports, {
  default: () => flatten_default
});
module.exports = __toCommonJS(flatten_exports);
var import_plainObject = __toESM(require("../is/plainObject"), 1);
function flatten(object, settings = {}) {
  const toReturn = {};
  if (!Array.isArray(object) && !(0, import_plainObject.default)(object))
    return object;
  settings = __spreadValues({
    separator: ".",
    array: false,
    quoteSeparatedProperties: true,
    quoteCharacter: '"',
    excludeProps: [],
    keepLastIntact: false
  }, settings);
  for (const key in object) {
    if (object[key] === void 0)
      continue;
    if (object[key] === null) {
      toReturn[key] = null;
      continue;
    }
    if (settings.excludeProps.indexOf(key) !== -1) {
      toReturn[key] = object[key];
      continue;
    }
    if (Array.isArray(object[key]) && settings.array || (!Array.isArray(object[key]) && typeof object[key]) == "object") {
      const isArray = Array.isArray(object[key]);
      const flatObject = flatten(object[key], __spreadProps(__spreadValues({}, settings), {
        keepLastIntact: false
      }));
      for (const x in flatObject) {
        if (flatObject[x] === void 0)
          continue;
        if (isArray) {
          toReturn[`${key}[${x}]`] = flatObject[x];
        } else {
          const part = key;
          if (settings.quoteSeparatedProperties && part.includes(settings.separator)) {
            toReturn[`${settings.quoteCharacter}${key}${settings.quoteCharacter}` + settings.separator + x] = flatObject[x];
          } else {
            toReturn[key + settings.separator + x] = flatObject[x];
          }
        }
      }
      continue;
    }
    toReturn[key] = object[key];
  }
  return toReturn;
}
var flatten_default = flatten;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
