import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
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
var querySelector_exports = {};
__export(querySelector_exports, {
  default: () => querySelector_default
});
module.exports = __toCommonJS(querySelector_exports);
var import_isVisible = __toESM(require("./isVisible"), 1);
var import_isInViewport = __toESM(require("./isInViewport"), 1);
var import_closestNotVisible = __toESM(require("./closestNotVisible"), 1);
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
    if ((0, import_isVisible.default)(elm) || (0, import_closestNotVisible.default)(elm))
      return null;
  } else if (settings.visible === true) {
    if (!(0, import_isVisible.default)(elm) || !(0, import_closestNotVisible.default)(elm))
      return null;
  }
  if (settings.inViewport === false) {
    if ((0, import_isInViewport.default)(elm))
      return null;
  } else if (settings.inViewport === true) {
    if (!(0, import_isInViewport.default)(elm))
      return null;
  }
  return elm;
}
var querySelector_default = querySelector;
