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
class postcssSugarPluginFitInterface extends __SInterface {
  static get _definition() {
    return {
      size: {
        type: "String",
        values: ["fill", "contain", "cover", "none"],
        default: "fill"
      }
    };
  }
}
function fit_default({
  params,
  atRule,
  CssVars,
  replaceWith
}) {
  const finalParams = __spreadValues({
    size: "fill"
  }, params);
  const vars = [];
  switch (finalParams.size) {
    case "cover":
      vars.push(`
                & {
                    object-fit: cover;
                }
            `);
      break;
    case "contain":
      vars.push(`
                & {
                    object-fit: contain;
                }
            `);
      break;
    case "none":
      vars.push(`
                & {
                    object-fit: none;
                }
            `);
      break;
    case "fill":
    default:
      vars.push(`
                & {
                    object-fit: fill;
                }
            `);
      break;
  }
  vars.push(`
        & {
            width: 100%; height: 100%;
        }
        &:not(img,video) {
                    object-fit: none;
                    position: absolute;
                    top: 0; left: 0;
                    width: 100%; height: 100%;
                }
    `);
  return vars;
}
export {
  fit_default as default,
  postcssSugarPluginFitInterface as interface
};
