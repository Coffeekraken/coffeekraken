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
class postcssSugarPluginComponentsClassesInterface extends __SInterface {
  static get _definition() {
    return {
      scope: {
        type: {
          type: "Array<String>",
          splitChars: [",", " "]
        },
        values: ["bare", "lnf", "vr", "tf"],
        default: ["bare", "lnf", "vr", "tf"]
      }
    };
  }
}
function classes_default({
  params,
  atRule,
  replaceWith
}) {
  const finalParams = __spreadValues({
    scope: ["bare", "lnf", "vr", "tf"]
  }, params);
  const vars = [];
  const componentsObj = __STheme.config("components");
  Object.keys(componentsObj).forEach((selector) => {
    var _a;
    if (finalParams.scope.indexOf("bare") !== -1) {
      vars.push(`
          ${selector} {
            ${__STheme.jsObjectToCssProperties(componentsObj[selector], {
        exclude: ["rhythmVertical"]
      })}
          }
        `);
    }
    if (finalParams.scope.indexOf("vr") !== -1) {
      vars.push(`
          @sugar.rhythm.vertical {
            ${selector} {
              ${__STheme.jsObjectToCssProperties((_a = componentsObj[selector].rhythmVertical) != null ? _a : {})}
            }
          }
        `);
    }
  });
  replaceWith(vars);
}
export {
  classes_default as default,
  postcssSugarPluginComponentsClassesInterface as interface
};
