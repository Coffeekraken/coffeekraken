import {
  __spreadValues
} from "../../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
import __STheme from "@coffeekraken/s-theme";
class postcssSugarPluginSpaceFunctionInterface extends __SInterface {
  static get _definition() {
    return {
      space: {
        type: "String",
        values: Object.keys(__STheme.config("space")),
        default: "default",
        required: true
      }
    };
  }
}
function space_default({
  params
}) {
  const finalParams = __spreadValues({
    space: ""
  }, params);
  const space = finalParams.space;
  if (__STheme.config("space")[space] === void 0)
    return space;
  const spaces = space.split(" ").map((s) => {
    const size = __STheme.config(`space.${s}`);
    if (!size)
      return size;
    return `var(${`--s-theme-space-${s}`}, ${size})`;
  });
  return spaces.join(" ");
}
export {
  space_default as default,
  postcssSugarPluginSpaceFunctionInterface as interface
};
