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
var getAnimationProperties_exports = {};
__export(getAnimationProperties_exports, {
  default: () => getAnimationProperties_default
});
module.exports = __toCommonJS(getAnimationProperties_exports);
var import_getStyleProperty = __toESM(require("./getStyleProperty"), 1);
var import_convert = __toESM(require("../../../shared/time/convert"), 1);
function getAnimationProperties(elm) {
  const name = (0, import_getStyleProperty.default)(elm, "animation-name") || "";
  const duration = (0, import_getStyleProperty.default)(elm, "animation-duration") || "0s";
  const timingFunction = (0, import_getStyleProperty.default)(elm, "animation-timing-function") || "linear";
  const delay = (0, import_getStyleProperty.default)(elm, "animation-delay") || "0s";
  const iterationCount = (0, import_getStyleProperty.default)(elm, "animation-iteration-count") || 1;
  const direction = (0, import_getStyleProperty.default)(elm, "animation-direction") || "normal";
  const props = {
    name: name.split(","),
    duration: duration.split(",").map((value) => (0, import_convert.default)(value, "ms")),
    delay: `${delay}`.split(",").map((value) => (0, import_convert.default)(value, "ms")),
    timingFunction: timingFunction.split(","),
    iterationCount: `${iterationCount}`.split(","),
    direction: direction.split(",")
  };
  let totalDuration = 0;
  const i = 0;
  const delays = [0].concat(props.delay);
  [0].concat(props.duration).forEach((val) => {
    if (val + delays[i] > totalDuration) {
      totalDuration = val + delays[i];
    }
  });
  props.totalDuration = totalDuration;
  return props;
}
var getAnimationProperties_default = getAnimationProperties;
