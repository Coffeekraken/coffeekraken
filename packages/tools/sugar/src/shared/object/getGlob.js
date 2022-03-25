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
import __minimatch from "minimatch";
import __flatten from "./flatten";
import __deepize from "./deepize";
function getGlob(obj, glob, settings = {}) {
  settings = __spreadValues({
    deepize: true
  }, settings);
  const flat = __flatten(obj);
  const resultObj = {};
  Object.keys(flat).forEach((path) => {
    if (__minimatch(path, glob)) {
      resultObj[path] = flat[path];
    }
  });
  if (settings.deepize === true)
    return __deepize(resultObj);
  return resultObj;
}
export {
  getGlob as default
};
