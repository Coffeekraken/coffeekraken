var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
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
import __isPlain from "../is/plainObject";
function flatten(object, settings = {}) {
  const toReturn = {};
  if (!Array.isArray(object) && !__isPlain(object))
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
export {
  flatten_default as default
};
