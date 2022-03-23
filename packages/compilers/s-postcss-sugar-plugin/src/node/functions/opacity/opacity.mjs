import {
  __spreadValues
} from "../../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
import __STheme from "@coffeekraken/s-theme";
class postcssSugarPluginOpacityFunctionInterface extends __SInterface {
  static get _definition() {
    return {
      opacity: {
        type: "String",
        values: Object.keys(__STheme.config("opacity")),
        default: "100",
        required: true
      }
    };
  }
}
function opacity_default({
  params
}) {
  const finalParams = __spreadValues({
    opacity: "100"
  }, params);
  const opacity = finalParams.opacity;
  if (__STheme.config("opacity")[opacity] === void 0)
    return opacity;
  const opacityRes = opacity.split(" ").map((s) => {
    const size = __STheme.config(`opacity.${s}`);
    if (!size)
      return size;
    return `var(${`--s-theme-opacity-${s}`}, ${size})`;
  });
  return opacityRes.join(" ");
}
export {
  opacity_default as default,
  postcssSugarPluginOpacityFunctionInterface as interface
};
