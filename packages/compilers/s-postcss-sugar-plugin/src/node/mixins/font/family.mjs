import {
  __spreadValues
} from "../../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
import __STheme from "@coffeekraken/s-theme";
class postcssSugarPluginFontFamilyInterface extends __SInterface {
  static get _definition() {
    return {
      font: {
        type: "String",
        values: Object.keys(__STheme.config("font.family")),
        required: true
      }
    };
  }
}
function family_default({
  params,
  atRule,
  CssVars,
  replaceWith
}) {
  const finalParams = __spreadValues({
    font: "default"
  }, params);
  const vars = new CssVars();
  const fontFamilyObj = __STheme.config(`font.family.${finalParams.font}`);
  Object.keys(fontFamilyObj).forEach((prop) => {
    switch (prop) {
      case "font-family":
      case "font-weight":
      case "font-style":
        vars.code(`${prop}: var(${`--s-theme-font-family-${finalParams.font}-${prop}`}, ${fontFamilyObj[prop]});`);
        break;
      default:
        break;
    }
  });
  return vars;
}
export {
  family_default as default,
  postcssSugarPluginFontFamilyInterface as interface
};
