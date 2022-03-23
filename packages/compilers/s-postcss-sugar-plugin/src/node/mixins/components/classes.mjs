import {
  __spreadValues
} from "../../../../../../chunk-TD77TI6B.mjs";
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
