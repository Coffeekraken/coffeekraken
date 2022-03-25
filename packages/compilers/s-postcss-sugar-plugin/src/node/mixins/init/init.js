import __SInterface from "@coffeekraken/s-interface";
import __SSugarConfig from "@coffeekraken/s-sugar-config";
class postcssSugarPluginMediaMixinInterface extends __SInterface {
  static get _definition() {
    return {
      theme: {
        type: "String",
        default: __SSugarConfig.get("theme.theme")
      },
      variant: {
        type: "String",
        default: __SSugarConfig.get("theme.variant")
      }
    };
  }
}
function init_default({
  params,
  atRule,
  replaceWith
}) {
  const cssArray = [
    "@sugar.reset;",
    `@sugar.theme(${params.variant}, ${params.theme});`,
    "@sugar.font.faces;"
  ];
  replaceWith(cssArray);
}
export {
  init_default as default,
  postcssSugarPluginMediaMixinInterface as interface
};
