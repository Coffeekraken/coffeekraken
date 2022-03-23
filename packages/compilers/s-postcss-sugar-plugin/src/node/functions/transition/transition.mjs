import {
  __spreadValues
} from "../../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
import __STheme from "@coffeekraken/s-theme";
class postcssSugarPluginTransitionFunctionInterface extends __SInterface {
  static get _definition() {
    return {
      name: {
        type: "String",
        values: Object.keys(__STheme.config("transition")),
        default: "default",
        required: true
      }
    };
  }
}
function transition_default({
  params
}) {
  const finalParams = __spreadValues({
    name: "default"
  }, params);
  if (__STheme.config("transition")[finalParams.name] === void 0)
    return finalParams.name;
  const transitions = finalParams.name.split(" ").map((t) => {
    const transition = __STheme.config(`transition.${t}`);
    if (!transition)
      return transition;
    return `var(${`--s-theme-transition-${t}`}, ${transition})`;
  });
  return transitions.join(" ");
}
export {
  transition_default as default,
  postcssSugarPluginTransitionFunctionInterface as interface
};
