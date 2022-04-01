import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var onScrollEnd_exports = {};
__export(onScrollEnd_exports, {
  default: () => onScrollEnd
});
module.exports = __toCommonJS(onScrollEnd_exports);
function onScrollEnd($elm, callback, settings) {
  const finalSettings = __spreadValues({
    offset: 20,
    once: false,
    times: -1
  }, settings != null ? settings : {});
  let isBody = false;
  let $scrollListenedElm = $elm;
  let $scrollHeightElm = $elm;
  if ($elm === window.document.body) {
    isBody = true;
    $scrollListenedElm = document;
    $scrollHeightElm = window.document.body;
  } else if ($elm === window.document) {
    isBody = true;
    $elm = window.document.body;
    $scrollHeightElm = window.document.body;
  }
  let active = true, count = 0;
  const internalCallback = (e) => {
    let fullHeight, viewportHeight, scrollTop;
    if (isBody) {
      viewportHeight = window.innerHeight;
      scrollTop = $scrollHeightElm.scrollTop;
      fullHeight = Math.max(window.document.body.scrollHeight, window.document.documentElement.scrollHeight, window.document.body.offsetHeight, window.document.documentElement.offsetHeight, window.document.body.clientHeight, window.document.documentElement.clientHeight);
    } else {
      viewportHeight = $scrollHeightElm.offsetHeight;
      scrollTop = $scrollHeightElm.scrollTop;
      fullHeight = $scrollHeightElm.scrollHeight;
    }
    if (active && scrollTop + viewportHeight >= fullHeight - finalSettings.offset) {
      callback();
      count++;
      if (finalSettings.once) {
        $scrollListenedElm.removeEventListener("scroll", internalCallback);
        active = false;
      } else if (finalSettings.times > 0 && count >= finalSettings.times) {
        $scrollListenedElm.removeEventListener("scroll", internalCallback);
        active = false;
      }
    } else if ($scrollHeightElm.offsetHeight + $scrollHeightElm.scrollTop < $scrollHeightElm.scrollHeight - finalSettings.offset) {
      active = true;
    }
  };
  $scrollListenedElm.addEventListener("scroll", internalCallback);
}
