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
import __SPromise from "@coffeekraken/s-promise";
function observeMutations($target, settings = {}) {
  settings = __spreadValues({
    attributes: true,
    childList: false,
    subtree: false
  }, settings);
  let mutationObserver;
  return new __SPromise(({ emit }) => {
    mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        emit("then", mutation);
      });
    });
    mutationObserver.observe($target, settings);
  }, {
    id: "observeMutations"
  }).on("finally", () => {
    mutationObserver && mutationObserver.disconnect();
  });
}
var observeMutations_default = observeMutations;
export {
  observeMutations_default as default
};
