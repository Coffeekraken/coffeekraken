import {
  __spreadValues
} from "../../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
import __STheme from "@coffeekraken/s-theme";
import __isValidUnitValue from "@coffeekraken/sugar/shared/css/isValidUnitValue";
class postcssSugarPluginFontSizeInterface extends __SInterface {
  static get _definition() {
    return {
      name: {
        type: "String",
        required: true,
        alias: "n"
      },
      scalable: {
        type: "Boolean",
        default: __STheme.config("scalable.font")
      }
    };
  }
}
function size_default({
  params
}) {
  const finalParams = __spreadValues({
    name: "",
    scalable: false
  }, params);
  const name = finalParams.name;
  if (__isValidUnitValue(name)) {
    if (finalParams.scalable)
      return `sugar.scalable(${name})`;
    return name;
  }
  return `sugar.theme(font.size.${name}, ${finalParams.scalable})`;
}
export {
  size_default as default,
  postcssSugarPluginFontSizeInterface as interface
};
