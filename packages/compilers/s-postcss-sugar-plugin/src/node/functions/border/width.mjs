import {
  __spreadValues
} from "../../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
import __STheme from "@coffeekraken/s-theme";
class postcssSugarPluginBorderWidthFunctionInterface extends __SInterface {
  static get _definition() {
    return {
      width: {
        type: "String",
        values: Object.keys(__STheme.config("border.width")),
        default: "default",
        required: true
      }
    };
  }
}
function width_default({
  params
}) {
  const finalParams = __spreadValues({
    width: ""
  }, params);
  const width = finalParams.width;
  if (__STheme.config("border.width")[width] === void 0)
    return width;
  const widthes = width.split(" ").map((s) => {
    const width2 = __STheme.config(`border.width.${s}`);
    if (!width2)
      return width2;
    return `var(${`--s-theme-border-width-${s}`}) ${finalParams.width !== "default" ? "!important" : ""}`;
  });
  return widthes.join(" ");
}
export {
  width_default as default,
  postcssSugarPluginBorderWidthFunctionInterface as interface
};
