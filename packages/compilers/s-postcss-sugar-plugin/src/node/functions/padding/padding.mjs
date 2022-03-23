import {
  __spreadValues
} from "../../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
import __STheme from "@coffeekraken/s-theme";
class postcssSugarPluginPaddingFunctionInterface extends __SInterface {
  static get _definition() {
    return {
      padding: {
        type: "String",
        values: Object.keys(__STheme.config("padding")),
        default: "default",
        required: true
      },
      scalable: {
        type: "Boolean",
        default: __STheme.config("scalable.padding")
      }
    };
  }
}
function padding_default({
  params
}) {
  const finalParams = __spreadValues({
    padding: "",
    scalable: true
  }, params);
  const padding = finalParams.padding;
  let paddings = padding.split(" ").map((s) => {
    if (s === `${parseInt(s)}`)
      return `sugar.theme(padding.${s}, ${finalParams.scalable})`;
    return s;
  });
  return paddings.join(" ");
}
export {
  padding_default as default,
  postcssSugarPluginPaddingFunctionInterface as interface
};
