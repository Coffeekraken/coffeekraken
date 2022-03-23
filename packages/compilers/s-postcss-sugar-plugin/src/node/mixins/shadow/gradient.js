var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
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
var gradient_exports = {};
__export(gradient_exports, {
  default: () => gradient_default,
  interface: () => postcssSugarPluginShadowGradientInterface
});
module.exports = __toCommonJS(gradient_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"));
class postcssSugarPluginShadowGradientInterface extends import_s_interface.default {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  interface
});
