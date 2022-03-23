import {
  __spreadValues
} from "../../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
import __STheme from "@coffeekraken/s-theme";
class postcssSugarPluginThemeInterface extends __SInterface {
  static get _definition() {
    return {
      dotPath: {
        type: "String",
        required: true
      },
      scalable: {
        type: "Boolean",
        default: false
      },
      return: {
        type: "String",
        values: ["var", "value"],
        default: "var"
      },
      fallback: {
        type: "Boolean",
        default: true
      }
    };
  }
}
function theme({
  params
}) {
  const finalParams = __spreadValues({}, params);
  if (finalParams.return === "var") {
    if (finalParams.scalable) {
      return `sugar.scalable(${__STheme.cssVar(finalParams.dotPath, finalParams.fallback)})`;
    } else {
      return __STheme.cssVar(finalParams.dotPath, finalParams.fallback);
    }
  } else {
    if (finalParams.scalable) {
      return `sugar.scalable(${__STheme.config(finalParams.dotPath)})`;
    } else {
      return __STheme.config(finalParams.dotPath);
    }
  }
}
export {
  theme as default,
  postcssSugarPluginThemeInterface as interface
};
