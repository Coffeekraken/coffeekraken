import {
  __spreadValues
} from "../../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
class postcssSugarPluginStateOutlineWhenMixinInterface extends __SInterface {
  static get _definition() {
    return {
      when: {
        type: "Array<String>",
        values: ["hover", "focus", "always"],
        default: ["focus"]
      }
    };
  }
}
function outlineWhen_default({
  params,
  atRule,
  replaceWith
}) {
  const finalParams = __spreadValues({
    when: ["focus"]
  }, params != null ? params : {});
  const vars = [];
  if (finalParams.when.indexOf("focus") !== -1) {
    vars.push(`
            &:focus-visible {
                &:not(:hover):not(:active) {
                    @sugar.outline;
                }
            }
        `);
  }
  if (finalParams.when.indexOf("hover") !== -1) {
    vars.push(`
                &:hover {
                    @sugar.outline;
                }
            `);
  }
  if (finalParams.when.indexOf("always") !== -1) {
    vars.push(`
           & {
                @sugar.outline;
            }
        `);
  }
  return vars;
}
export {
  outlineWhen_default as default,
  postcssSugarPluginStateOutlineWhenMixinInterface as interface
};
