var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var inViewportPercentage_exports = {};
__export(inViewportPercentage_exports, {
  default: () => inViewportPercentage_default
});
module.exports = __toCommonJS(inViewportPercentage_exports);
var import_isVisible = __toESM(require("../isVisible"), 1);
function inViewportPercentage(elm) {
  if (!(0, import_isVisible.default)(elm))
    return 0;
  const bounding = elm.getBoundingClientRect();
  let percentageWidth = 100, percentageHeight = 100;
  if (bounding.top >= 0 && bounding.bottom <= window.innerHeight) {
    percentageHeight = 100;
  } else {
    const elmHeight = bounding.bottom - bounding.top;
    if (bounding.top < 0) {
      percentageHeight -= 100 / elmHeight * (bounding.top * -1);
    }
    if (bounding.bottom > window.innerHeight) {
      percentageHeight -= 100 / elmHeight * (bounding.bottom - window.innerHeight);
    }
  }
  percentageHeight = Math.round(percentageHeight);
  if (percentageHeight < 0)
    percentageHeight = 0;
  if (percentageHeight > 100)
    percentageHeight = 100;
  if (bounding.left >= 0 && bounding.right <= window.innerWidth) {
    percentageWidth = 100;
  } else {
    const elmWidth = bounding.right - bounding.left;
    if (bounding.left < 0) {
      percentageWidth -= 100 / elmWidth * (bounding.left * -1);
    }
    if (bounding.right > window.innerWidth) {
      percentageWidth -= 100 / elmWidth * (bounding.right - window.innerWidth);
    }
  }
  percentageWidth = Math.round(percentageWidth);
  if (percentageWidth < 0)
    percentageWidth = 0;
  if (percentageWidth > 100)
    percentageWidth = 100;
  return Math.round(100 / (100 * 100) * (percentageWidth * percentageHeight));
}
var inViewportPercentage_default = inViewportPercentage;
