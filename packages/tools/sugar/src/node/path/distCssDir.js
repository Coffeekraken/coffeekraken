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
import __SSugarConfig from "@coffeekraken/s-sugar-config";
function distCssDir_default(settings = {}) {
  settings = __spreadValues({}, settings);
  const distCssDir = __SSugarConfig.get("storage.dist.cssDir");
  if (distCssDir !== void 0) {
    return distCssDir;
  }
  return void 0;
}
export {
  distCssDir_default as default
};
