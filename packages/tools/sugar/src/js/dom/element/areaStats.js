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
import __traverseUp from "../traverse/up";
import __scrollTop from "../scroll/scrollTop";
import __scrollLeft from "../scroll/scrollLeft";
function areaStats($elm, settings) {
  const finalSettings = __spreadValues({
    relativeTo: "visible"
  }, settings != null ? settings : {});
  if (finalSettings.relativeTo === "visible") {
    finalSettings.relativeTo = __traverseUp($elm, ($item) => {
      const style = window.getComputedStyle($item);
      if (style.overflow === "hidden")
        return $item;
      return false;
    });
  }
  let rootBoundingRect;
  if ((finalSettings == null ? void 0 : finalSettings.relativeTo) && finalSettings.relativeTo instanceof HTMLElement) {
    rootBoundingRect = finalSettings == null ? void 0 : finalSettings.relativeTo.getBoundingClientRect();
  } else {
    rootBoundingRect = {
      top: __scrollTop(),
      left: __scrollLeft(),
      width: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
      height: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    };
  }
  const boundingRect = $elm.getBoundingClientRect();
  const left = boundingRect.left - rootBoundingRect.left, top = boundingRect.top - rootBoundingRect.top;
  let percentageX, percentageY;
  if (boundingRect.left + boundingRect.width < rootBoundingRect.left) {
    percentageX = 0;
  } else if (boundingRect.left > rootBoundingRect.left + rootBoundingRect.width) {
    percentageX = 0;
  } else if (boundingRect.left >= rootBoundingRect.left && boundingRect.left + boundingRect.width <= rootBoundingRect.left + rootBoundingRect.width) {
    percentageX = 100;
  } else if (boundingRect.left < rootBoundingRect.left && boundingRect.left + boundingRect.width > rootBoundingRect.left + rootBoundingRect.width) {
    percentageX = 100 / boundingRect.width * rootBoundingRect.width;
  } else if (boundingRect.left < rootBoundingRect.left && boundingRect.left + boundingRect.width <= rootBoundingRect.left + rootBoundingRect.width) {
    percentageX = 100 / boundingRect.width * (boundingRect.left + boundingRect.width - rootBoundingRect.left);
  } else if (boundingRect.left < rootBoundingRect.left + rootBoundingRect.width && boundingRect.left + boundingRect.width > rootBoundingRect.left + rootBoundingRect.width) {
    percentageX = 100 / boundingRect.width * (boundingRect.width - (boundingRect.left + boundingRect.width - (rootBoundingRect.left + rootBoundingRect.width)));
  }
  if (boundingRect.left + boundingRect.height < rootBoundingRect.top) {
    percentageY = 0;
  } else if (boundingRect.top > rootBoundingRect.top + rootBoundingRect.height) {
    percentageY = 0;
  } else if (boundingRect.top >= rootBoundingRect.top && boundingRect.top + boundingRect.height <= rootBoundingRect.top + rootBoundingRect.height) {
    percentageY = 100;
  } else if (boundingRect.top < rootBoundingRect.top && boundingRect.top + boundingRect.height > rootBoundingRect.top + rootBoundingRect.height) {
    percentageY = 100 / boundingRect.height * rootBoundingRect.height;
  } else if (boundingRect.top < rootBoundingRect.top && boundingRect.top + boundingRect.height <= rootBoundingRect.top + rootBoundingRect.height) {
    percentageY = 100 / boundingRect.height * (boundingRect.top + boundingRect.height - rootBoundingRect.top);
  } else if (boundingRect.top < rootBoundingRect.top + rootBoundingRect.height && boundingRect.top + boundingRect.height > rootBoundingRect.top + rootBoundingRect.height) {
    percentageY = 100 / boundingRect.height * (boundingRect.height - (boundingRect.top + boundingRect.height - (rootBoundingRect.top + rootBoundingRect.height)));
  }
  const surfaceX = boundingRect.width / 100 * percentageX, surfaceY = boundingRect.height / 100 * percentageY;
  const percentage = percentageX > 0 && percentageY > 0 ? 100 / 200 * (percentageX + percentageY) : 0;
  return {
    percentage,
    percentageX: percentageY > 0 ? percentageX : 0,
    percentageY: percentageX > 0 ? percentageY : 0,
    width: percentageX > 0 && percentageY > 0 ? surfaceX : 0,
    height: percentageY > 0 && percentageX > 0 ? surfaceY : 0,
    left: boundingRect.left,
    relLeft: left,
    top: boundingRect.top,
    relTop: top
  };
}
export {
  areaStats as default
};
