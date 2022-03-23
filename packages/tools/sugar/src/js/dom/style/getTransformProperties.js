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
var getTransformProperties_exports = {};
__export(getTransformProperties_exports, {
  default: () => getTransformProperties_default
});
module.exports = __toCommonJS(getTransformProperties_exports);
var import_getTranslateProperties = __toESM(require("./getTranslateProperties"), 1);
var import_getRotateProperties = __toESM(require("./getRotateProperties"), 1);
function getTransformProperties($elm) {
  const rotates = (0, import_getRotateProperties.default)($elm), translates = (0, import_getTranslateProperties.default)($elm);
  return {
    translateX: translates.x,
    translateY: translates.y,
    translateZ: translates.z,
    rotateX: rotates.x,
    rotateY: rotates.y,
    rotateZ: rotates.z
  };
}
var getTransformProperties_default = getTransformProperties;
