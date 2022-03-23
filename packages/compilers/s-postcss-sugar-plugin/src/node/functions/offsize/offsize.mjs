import {
  __spreadValues
} from "../../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
import __STheme from "@coffeekraken/s-theme";
class postcssSugarPluginOffsizeFunctionInterface extends __SInterface {
  static get _definition() {
    return {
      offsize: {
        type: "String",
        values: Object.keys(__STheme.config("offsize")),
        default: "default",
        required: true
      },
      scalable: {
        type: "Boolean",
        default: __STheme.config("scalable.offsize")
      }
    };
  }
}
function offsize_default({
  params
}) {
  const finalParams = __spreadValues({
    offsize: "",
    scalable: false
  }, params);
  const offsize = finalParams.offsize;
  let offsizes = offsize.split(" ").map((s) => {
    if (s === `${parseInt(s)}`)
      return `sugar.theme(offsize.${s}, ${finalParams.scalable})`;
    return s;
  });
  return offsizes.join(" ");
}
export {
  offsize_default as default,
  postcssSugarPluginOffsizeFunctionInterface as interface
};
