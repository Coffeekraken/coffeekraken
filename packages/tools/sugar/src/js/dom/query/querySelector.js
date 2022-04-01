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
import __isVisible from "./isVisible";
import __isInViewport from "./isInViewport";
import __closestNotVisible from "./closestNotVisible";
function querySelector(selector, settings = {}) {
  settings = __spreadValues({
    visible: null,
    inViewport: null,
    rootNode: document.body
  }, settings);
  const elm = settings.rootNode.querySelector(selector);
  if (!elm)
    return null;
  if (settings.visible === false) {
    if (__isVisible(elm) || __closestNotVisible(elm))
      return null;
  } else if (settings.visible === true) {
    if (!__isVisible(elm) || !__closestNotVisible(elm))
      return null;
  }
  if (settings.inViewport === false) {
    if (__isInViewport(elm))
      return null;
  } else if (settings.inViewport === true) {
    if (!__isInViewport(elm))
      return null;
  }
  return elm;
}
var querySelector_default = querySelector;
export {
  querySelector_default as default
};
