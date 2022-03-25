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
