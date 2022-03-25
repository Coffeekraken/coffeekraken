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
class postcssSugarPluginThemeinInterface extends __SInterface {
  static get _definition() {
    return {
      variant: {
        type: "String"
      },
      theme: {
        type: "String"
      },
      scope: {
        type: "Boolean",
        default: false
      }
    };
  }
}
function theme_default({
  params,
  atRule,
  replaceWith
}) {
  const finalParams = __spreadValues({
    variant: void 0,
    theme: void 0,
    scope: false
  }, params);
  const vars = __STheme.toCssVars(finalParams.theme, finalParams.variant);
  const selectors = [];
  if (finalParams.theme)
    selectors.push(`[theme^="${finalParams.theme}"]`);
  if (finalParams.variant)
    selectors.push(`[theme$="${finalParams.variant}"]`);
  if (finalParams.scope) {
    vars.unshift(`${selectors.length === 2 ? `${selectors[0]}${selectors[1]}` : selectors.join(",")} {`);
    vars.push(`@sugar.lnf.base;`);
    vars.push("}");
  } else if (atRule.parent.type === "root") {
    vars.unshift(":root {");
    vars.push(`@sugar.lnf.base;`);
    vars.push("}");
  } else {
    vars.push(`@sugar.lnf.base;`);
  }
  return vars;
}
export {
  theme_default as default,
  postcssSugarPluginThemeinInterface as interface
};
