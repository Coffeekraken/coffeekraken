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
import __STheme from "@coffeekraken/s-theme";
class postcssSugarPluginGradientInterface extends __SInterface {
  static get _definition() {
    return {
      start: {
        type: "String",
        required: true,
        alias: "s"
      },
      end: {
        type: "String",
        required: true,
        alias: "e"
      },
      type: {
        type: "String",
        values: ["linear", "radial"],
        default: "linear"
      },
      x: {
        type: "String"
      },
      y: {
        type: "String"
      },
      angle: {
        type: "Number |\xA0String",
        default: 0
      },
      size: {
        type: "String",
        default: "farthest-side"
      }
    };
  }
}
function gradient_default({
  params,
  atRule,
  replaceWith
}) {
  const finalParams = __spreadValues({
    start: "",
    end: "",
    x: "50%",
    y: "50%",
    type: "linear",
    angle: 0,
    size: "farthest-side"
  }, params);
  let startColorVar = finalParams.start, endColorVar = finalParams.end;
  const themeColorsObj = __STheme.config("color");
  if (startColorVar.match(/^[a-zA-Z0-9:_-]+$/) && themeColorsObj[startColorVar]) {
    startColorVar = `sugar.color(${startColorVar})`;
  }
  if (endColorVar.match(/^[a-zA-Z0-9:_-]+$/) && themeColorsObj[endColorVar]) {
    endColorVar = `sugar.color(${endColorVar})`;
  }
  const angleVar = typeof finalParams.angle === "number" ? `${finalParams.angle}deg` : finalParams.angle;
  let gradientCss = `background: linear-gradient(${angleVar}, ${startColorVar} 0%, ${endColorVar} 100%);`;
  if (finalParams.type === "radial") {
    gradientCss = `background: radial-gradient(${finalParams.size} at ${finalParams.x} ${finalParams.y}, ${startColorVar} 0%, ${endColorVar} 100%);`;
  }
  const vars = [gradientCss];
  return vars;
}
export {
  gradient_default as default,
  postcssSugarPluginGradientInterface as interface
};
