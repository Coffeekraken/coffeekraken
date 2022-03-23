import {
  __spreadValues
} from "../../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
class postcssSugarPluginScopeNoMixinInterface extends __SInterface {
  static get _definition() {
    return {
      scopes: {
        type: {
          type: "Array<String>",
          splitChars: [",", " "]
        },
        required: true
      }
    };
  }
}
const _noScopesStack = [];
function no_default({
  params,
  sharedData,
  atRule,
  replaceWith,
  postcssApi
}) {
  const finalParams = __spreadValues({
    scopes: []
  }, params != null ? params : {});
}
export {
  no_default as default,
  postcssSugarPluginScopeNoMixinInterface as interface
};
