import {
  __spreadValues
} from "../../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
class postcssSugarPluginmountedMixinInterface extends __SInterface {
  static get _definition() {
    return {
      state: {
        type: "String",
        values: ["mounted"],
        required: true
      },
      sibling: {
        type: "Boolean",
        default: false
      }
    };
  }
}
function mounted_default({
  params,
  atRule,
  postcssApi
}) {
  const finalParams = __spreadValues({
    state: "mounted",
    sibling: false
  }, params != null ? params : {});
  let selector;
  switch (finalParams.state) {
    case "mounted":
      if (finalParams.sibling) {
        selector = "*:not([mounted]):not(.mounted) &";
      } else {
        selector = "&:not([mounted]):not(.mounted)";
      }
      break;
  }
  const wrapperRule = new postcssApi.Rule({
    selector
  });
  atRule.nodes.forEach((node) => {
    wrapperRule.append(node);
  });
  atRule.replaceWith(wrapperRule);
}
export {
  mounted_default as default,
  postcssSugarPluginmountedMixinInterface as interface
};
