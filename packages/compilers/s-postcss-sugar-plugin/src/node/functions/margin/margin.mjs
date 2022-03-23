import {
  __spreadValues
} from "../../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
import __STheme from "@coffeekraken/s-theme";
class postcssSugarPluginMarginFunctionInterface extends __SInterface {
  static get _definition() {
    return {
      margin: {
        type: "String",
        values: Object.keys(__STheme.config("margin")),
        default: "default",
        required: true
      },
      scalable: {
        type: "Boolean",
        default: __STheme.config("scalable.margin")
      }
    };
  }
}
function margin_default({
  params
}) {
  const finalParams = __spreadValues({
    margin: "",
    scalable: false
  }, params);
  const margin = finalParams.margin;
  let margins = margin.split(" ").map((s) => {
    if (s === `${parseInt(s)}`)
      return `sugar.theme(margin.${s}, ${finalParams.scalable})`;
    return s;
  });
  return margins.join(" ");
}
export {
  margin_default as default,
  postcssSugarPluginMarginFunctionInterface as interface
};
