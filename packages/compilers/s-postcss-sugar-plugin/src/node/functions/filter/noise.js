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
class postcssSugarPluginDisabledInterface extends __SInterface {
  static get _definition() {
    return {
      frequency: {
        type: "Number",
        required: true,
        default: 0.65
      },
      width: {
        type: "String",
        required: true,
        default: "5000px"
      },
      height: {
        type: "String",
        required: true,
        default: "5000px"
      }
    };
  }
}
function noise_default({
  params,
  atRule,
  replaceWith
}) {
  const finalParams = __spreadValues({
    frequency: 0.65,
    width: "5000px",
    height: "5000px"
  }, params);
  return `url('data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${finalParams.width} ${finalParams.height}" style="width:${finalParams.width};height:${finalParams.height};"><style type="text/css"><![CDATA[ rect{filter:url(#filter);width:${finalParams.width};height:${finalParams.height};} ]]></style><filter id="filter"><feTurbulence type="fractalNoise" baseFrequency="${finalParams.frequency}" numOctaves="3" stitchTiles="stitch" /></filter><rect filter="url(#filter)" /></svg>`)}')`;
}
export {
  noise_default as default,
  postcssSugarPluginDisabledInterface as interface
};
