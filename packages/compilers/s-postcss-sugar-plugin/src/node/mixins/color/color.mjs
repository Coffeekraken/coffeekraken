import {
  __spreadValues
} from "../../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
class postcssSugarPluginColorMixinInterface extends __SInterface {
  static get _definition() {
    return {
      current: {
        type: "String",
        required: true
      },
      primary: {
        type: "String"
      },
      secondary: {
        type: "String"
      }
    };
  }
}
function color_default({
  params,
  atRule,
  CssVars,
  replaceWith
}) {
  const finalParams = __spreadValues({
    current: "",
    primary: void 0,
    secondary: void 0
  }, params);
  const vars = new CssVars(`
        @sugar.color.remap(current, ${finalParams.current});`);
  if (finalParams.primary) {
    vars.code(`@sugar.color.remap(primary, ${finalParams.primary});`);
  } else {
    vars.code(`@sugar.color.remap(primary, ${finalParams.current});`);
  }
  if (finalParams.secondary) {
    vars.code(`@sugar.color.remap(secondary, ${finalParams.secondary});`);
  } else {
    vars.code(`@sugar.color.remap(secondary, ${finalParams.current});`);
  }
  return vars;
}
export {
  color_default as default,
  postcssSugarPluginColorMixinInterface as interface
};
