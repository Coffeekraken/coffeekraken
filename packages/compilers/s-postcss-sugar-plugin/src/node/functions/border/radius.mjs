import {
  __spreadValues
} from "../../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
import __STheme from "@coffeekraken/s-theme";
class postcssSugarPluginBorderRadiusFunctionInterface extends __SInterface {
  static get _definition() {
    return {
      radius: {
        type: "String",
        values: Object.keys(__STheme.config("border.radius")),
        default: "default",
        required: true
      }
    };
  }
}
function radius_default({
  params
}) {
  const finalParams = __spreadValues({
    radius: ""
  }, params);
  const radius = finalParams.radius;
  if (__STheme.config("border.radius")[radius] === void 0)
    return radius;
  const radiuses = radius.split(" ").map((s) => {
    return `var(${`--s-theme-border-radius-${s}`}) ${finalParams.radius !== "default" ? "!important" : ""}`;
  });
  return radiuses.join(" ");
}
export {
  radius_default as default,
  postcssSugarPluginBorderRadiusFunctionInterface as interface
};
