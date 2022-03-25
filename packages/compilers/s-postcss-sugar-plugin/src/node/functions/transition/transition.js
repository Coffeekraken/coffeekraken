var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
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
