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
class postcssSugarPluginShadowGradientInterface extends __SInterface {
  static get _definition() {
    return {
      x: {
        type: "Number|String",
        required: true,
        default: 0
      },
      y: {
        type: "Number|String",
        required: true,
        default: 0
      },
      blur: {
        type: "Number|String",
        required: true,
        default: 0
      },
      spread: {
        type: "Number|String",
        required: true,
        default: 0
      },
      startColor: {
        type: "String",
        required: true,
        default: "sugar.color(accent)"
      },
      endColor: {
        type: "String",
        required: true,
        default: "sugar.color(complementary)"
      },
      angle: {
        type: "String",
        required: false,
        default: "90deg"
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
    x: 0,
    y: 0,
    blur: 0,
    spread: 0,
    startColor: "",
    endColor: "",
    angle: ""
  }, params);
  const vars = [];
  vars.push(`
        &:before {
            z-index: 0;
            content: '';
            position: absolute;
            top: calc(50% + ${typeof finalParams.y === "number" ? finalParams.y + "px" : finalParams.y});
            left: calc(50% + ${typeof finalParams.x === "number" ? finalParams.x + "px" : finalParams.x});
            width: 100%; height: 100%;
            background: linear-gradient(${finalParams.angle}, ${finalParams.startColor}, ${finalParams.endColor});
            filter: blur(${finalParams.blur});
            transform: translate(-50%, -50%) scale(${finalParams.spread});

            ${atRule.nodes.map((node) => node.toString()).join(";")}

        }
    `);
  return vars;
}
export {
  gradient_default as default,
  postcssSugarPluginShadowGradientInterface as interface
};
