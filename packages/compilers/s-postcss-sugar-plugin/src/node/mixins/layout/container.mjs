import {
  __spreadValues
} from "../../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
import __STheme from "@coffeekraken/s-theme";
class postcssSugarPluginLayoutContainerInterface extends __SInterface {
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
function container_default({
  params,
  atRule,
  replaceWith
}) {
  const finalParams = __spreadValues({
    name: "default"
  }, params);
  const vars = [
    `
    margin: auto;
  `
  ];
  const containerConfig = __STheme.config(`layout.container.${finalParams.name}`);
  if (!containerConfig) {
    throw new Error(`<red>[mixins.layout.container]</red> Sorry but the requested "<yellow>${finalParams.name}</yellow>" does not exists in the "<cyan>config.theme.layout.container</cyan>" configuration`);
  }
  Object.keys(containerConfig).forEach((key) => {
    vars.push(`${key}: ${containerConfig[key]};`);
  });
  return vars;
}
export {
  container_default as default,
  postcssSugarPluginLayoutContainerInterface as interface
};
