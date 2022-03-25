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
import __isEqual from "is-equal";
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
      if (__isPlainObject(object1[_prop]) && __isPlainObject(object2[_prop])) {
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
      if (__isEqual(object1[_prop], object2[_prop])) {
        finalObj[_prop] = object2[_prop];
        continue;
      }
    }
    if (settings.emptyObject) {
      if (__isPlainObject(object1[_prop]) && Object.keys(object1[_prop]).length === 0) {
        finalObj[_prop] = {};
        continue;
      }
    }
    if (settings.updated) {
      if (object1[_prop] === void 0 || object2[_prop] === void 0) {
        continue;
      }
      if (!__isEqual(object1[_prop], object2[_prop])) {
        finalObj[_prop] = object2[_prop];
        continue;
      }
    }
  }
  return finalObj;
}
var diff_default = diff;
export {
  diff_default as default
};
