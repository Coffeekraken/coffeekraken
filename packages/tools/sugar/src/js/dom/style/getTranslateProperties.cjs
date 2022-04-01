import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
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
var getTranslateProperties_exports = {};
__export(getTranslateProperties_exports, {
  default: () => getTranslateProperties_default
});
module.exports = __toCommonJS(getTranslateProperties_exports);
var __rematrix = __toESM(require("rematrix"), 1);
function getTranslateProperties($elm) {
  if (!window.getComputedStyle)
    return {
      x: 0,
      y: 0,
      z: 0
    };
  const style = getComputedStyle($elm);
  const transform = style.transform || style.webkitTransform || style.mozTransform || style.msTransform;
  if (!transform)
    return {
      x: 0,
      y: 0,
      z: 0
    };
  const matrix3d = __rematrix.fromString(transform);
  return {
    x: matrix3d[12],
    y: matrix3d[13],
    z: matrix3d[14]
  };
}
var getTranslateProperties_default = getTranslateProperties;
