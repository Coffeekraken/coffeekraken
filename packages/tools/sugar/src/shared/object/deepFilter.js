var __defProp = Object.defineProperty;
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
import __isPlainObject from "../is/plainObject";
function processObj(object, filter, settings) {
  const newObj = {}, keys = Object.keys(object);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = object[key];
    const res = filter({
      key,
      value,
      isObject: __isPlainObject(value)
    });
    if (res === true) {
      if (__isPlainObject(value)) {
        newObj[key] = settings.cloneFirst ? Object.assign({}, value) : value, filter, settings;
      } else {
        newObj[key] = value;
      }
    } else if (res === void 0) {
      if (__isPlainObject(value)) {
        newObj[key] = settings.cloneFirst ? processObj(Object.assign({}, value), filter, settings) : processObj(value, filter, settings);
      } else {
        newObj[key] = value;
      }
    } else if (res === false) {
      continue;
    }
  }
  return newObj;
}
function deepFilter(object, filter, settings) {
  settings = __spreadValues({
    cloneFirst: true
  }, settings != null ? settings : {});
  return processObj(settings.cloneFirst ? Object.assign({}, object) : object, filter, settings);
}
var deepFilter_default = deepFilter;
export {
  deepFilter_default as default
};
