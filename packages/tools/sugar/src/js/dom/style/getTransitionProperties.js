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
var getTransitionProperties_exports = {};
__export(getTransitionProperties_exports, {
  default: () => getTransitionProperties_default
});
module.exports = __toCommonJS(getTransitionProperties_exports);
var import_getStyleProperty = __toESM(require("./getStyleProperty"), 1);
var import_convert = __toESM(require("../../../shared/time/convert"), 1);
function splitIfNeeded(what, separator) {
  if (what.indexOf(separator) !== -1) {
    return what.split(separator).map((item) => item.trim());
  }
  return [what];
}
function getTransitionProperties(elm) {
  const property = (0, import_getStyleProperty.default)(elm, "transition-property");
  const duration = (0, import_getStyleProperty.default)(elm, "transition-duration") || 0;
  const timingFunction = (0, import_getStyleProperty.default)(elm, "transition-timing-function");
  const delay = (0, import_getStyleProperty.default)(elm, "transition-delay");
  const props = {
    property: splitIfNeeded(property, ","),
    duration: splitIfNeeded(duration, ",").map((value) => (0, import_convert.default)(value, "ms")),
    delay: splitIfNeeded(delay, ",").map((value) => (0, import_convert.default)(value, "ms")),
    timingFunction: splitIfNeeded(timingFunction, ",")
  };
  let totalDuration = 0;
  let i = 0;
  const delays = [0].concat(props.delay);
  [0].concat(props.duration).forEach((val) => {
    if (val + delays[i] > totalDuration) {
      totalDuration = val + delays[i];
    }
    i++;
  });
  props.totalDuration = totalDuration;
  return props;
}
var getTransitionProperties_default = getTransitionProperties;
