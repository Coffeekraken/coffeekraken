import {
  __spreadValues
} from "../../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
import __STheme from "@coffeekraken/s-theme";
class postcssSugarPluginColorRemapMixinInterface extends __SInterface {
  static get _definition() {
    return {
      color: {
        type: "String",
        required: true
      },
      toColor: {
        type: "String",
        required: true
      }
    };
  }
}
function remap_default({
  params,
  atRule,
  replaceWith
}) {
  const finalParams = __spreadValues({
    color: "",
    toColor: ""
  }, params);
  const vars = [
    ...__STheme.remapCssColor(finalParams.color, finalParams.toColor).vars
  ];
  if (atRule.parent.type === "root") {
    vars.unshift(":root {");
    vars.push("}");
  }
  return vars;
}
export {
  remap_default as default,
  postcssSugarPluginColorRemapMixinInterface as interface
};
