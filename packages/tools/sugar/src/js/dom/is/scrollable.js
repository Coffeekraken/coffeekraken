import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
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
function isScrollable($elm, settings) {
  settings = __spreadValues({
    x: true,
    y: true
  }, settings != null ? settings : {});
  var overflowY = window.getComputedStyle($elm)["overflow-y"];
  var overflowX = window.getComputedStyle($elm)["overflow-x"];
  const dir = {
    vertical: (overflowY === "scroll" || overflowY === "auto") && $elm.scrollHeight > $elm.clientHeight,
    horizontal: (overflowX === "scroll" || overflowX === "auto") && $elm.scrollWidth > $elm.clientWidth
  };
  if (settings.x && dir.horizontal)
    return true;
  if (settings.y && dir.vertical)
    return true;
  return false;
}
export {
  isScrollable as default
};
