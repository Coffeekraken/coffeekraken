import {
  __spreadValues
} from "../../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
class postcssSugarPluginThemeWhenMixinInterface extends __SInterface {
  static get _definition() {
    return {
      variant: {
        type: "String"
      },
      theme: {
        type: "String"
      }
    };
  }
}
function when_default({
  params,
  atRule,
  postcssApi
}) {
  const finalParams = __spreadValues({}, params != null ? params : {});
  let theme = finalParams.theme, variant = finalParams.variant;
  let container;
  if (theme && variant) {
    container = new postcssApi.Rule({
      selectors: [
        `[theme^="${theme}"][theme$="${variant}"] &`,
        `&[theme^="${theme}"][theme$="${variant}"]`
      ]
    });
  } else if (theme) {
    container = new postcssApi.Rule({
      selectors: [
        `[theme^="${theme}"] &`,
        `&[theme^="${theme}"]`
      ]
    });
  } else if (variant) {
    container = new postcssApi.Rule({
      selectors: [
        `[theme$="${variant}"] &`,
        `&[theme$="${variant}"]`
      ]
    });
  }
  atRule.nodes.forEach((n) => {
    container.append(n.clone());
  });
  atRule.replaceWith(container);
}
export {
  when_default as default,
  postcssSugarPluginThemeWhenMixinInterface as interface
};
