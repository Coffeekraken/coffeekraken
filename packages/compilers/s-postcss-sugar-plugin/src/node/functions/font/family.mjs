import {
  __spreadValues
} from "../../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
import __isValidUnitValue from "@coffeekraken/sugar/shared/css/isValidUnitValue";
class postcssSugarPluginFontFamilyInterface extends __SInterface {
  static get _definition() {
    return {
      name: {
        type: "String",
        required: true,
        alias: "n"
      }
    };
  }
}
function family_default({
  params
}) {
  const finalParams = __spreadValues({
    name: ""
  }, params);
  const name = finalParams.name;
  if (__isValidUnitValue(name)) {
    return name;
  }
  return `sugar.theme(font.family.${name}.font-family)`;
}
export {
  family_default as default,
  postcssSugarPluginFontFamilyInterface as interface
};
