import {
  __spreadValues
} from "../../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
class postcssSugarPluginTransitionMixinInterface extends __SInterface {
  static get _definition() {
    return {
      name: {
        type: "String",
        required: true,
        default: "default"
      }
    };
  }
}
function transition_default({
  params,
  atRule,
  replaceWith
}) {
  const finalParams = __spreadValues({}, params != null ? params : {});
  const vars = [
    `transition: sugar.transition(${finalParams.name}) ${finalParams.name !== "default" ? "!important" : ""};`
  ];
  return vars;
}
export {
  transition_default as default,
  postcssSugarPluginTransitionMixinInterface as interface
};
