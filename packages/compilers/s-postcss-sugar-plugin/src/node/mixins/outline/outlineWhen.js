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
class postcssSugarPluginStateOutlineWhenMixinInterface extends __SInterface {
  static get _definition() {
    return {
      when: {
        type: "Array<String>",
        values: ["hover", "focus", "always"],
        default: ["focus"]
      }
    };
  }
}
function outlineWhen_default({
  params,
  atRule,
  replaceWith
}) {
  const finalParams = __spreadValues({
    when: ["focus"]
  }, params != null ? params : {});
  const vars = [];
  if (finalParams.when.indexOf("focus") !== -1) {
    vars.push(`
            &:focus-visible {
                &:not(:hover):not(:active) {
                    @sugar.outline;
                }
            }
        `);
  }
  if (finalParams.when.indexOf("hover") !== -1) {
    vars.push(`
                &:hover {
                    @sugar.outline;
                }
            `);
  }
  if (finalParams.when.indexOf("always") !== -1) {
    vars.push(`
           & {
                @sugar.outline;
            }
        `);
  }
  return vars;
}
export {
  outlineWhen_default as default,
  postcssSugarPluginStateOutlineWhenMixinInterface as interface
};
