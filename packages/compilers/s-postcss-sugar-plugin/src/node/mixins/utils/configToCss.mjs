import {
  __spreadValues
} from "../../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
import __STheme from "@coffeekraken/s-theme";
class postcssSugarPluginUtilsConfigToCssInterface extends __SInterface {
  static get _definition() {
    return {
      dotPath: {
        type: "String",
        required: true
      },
      exclude: {
        type: "Array<String>"
      },
      only: {
        type: "Array<String>"
      }
    };
  }
}
function configToCss_default({
  params,
  atRule,
  replaceWith
}) {
  const finalParams = __spreadValues({
    dotPath: "",
    exclude: [],
    only: []
  }, params);
  const configObj = __STheme.config(params.dotPath);
  const vars = [
    __STheme.jsObjectToCssProperties(configObj, {
      exclude: finalParams.exclude,
      only: finalParams.only
    })
  ];
  return vars;
}
export {
  configToCss_default as default,
  postcssSugarPluginUtilsConfigToCssInterface as interface
};
