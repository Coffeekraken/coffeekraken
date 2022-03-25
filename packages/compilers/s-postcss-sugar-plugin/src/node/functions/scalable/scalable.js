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
import __SInterface from "@coffeekraken/s-interface";
class postcssSugarPluginScalableFunctionInterface extends __SInterface {
  static get _definition() {
    return {
      value: {
        type: "String|Number",
        required: true
      }
    };
  }
}
function scalable_default({
  params
}) {
  const finalParams = __spreadValues({
    value: ""
  }, params);
  return `calc(${finalParams.value} * var(--s-scale, 1))`;
}
export {
  scalable_default as default,
  postcssSugarPluginScalableFunctionInterface as interface
};
