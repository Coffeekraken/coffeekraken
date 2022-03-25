import __SInterface from "@coffeekraken/s-interface";
import __STheme from "@coffeekraken/s-theme";
class postcssSugarPluginDocblockColorsMixinInterface extends __SInterface {
  static get _definition() {
    return {};
  }
}
function docblocks_default({ params, atRule, CssVars, replaceWith }) {
  const vars = new CssVars();
  const colorsObj = __STheme.config("color");
  const colors = Object.keys(colorsObj);
  colors.forEach((colorName) => {
    const colorObj = colorsObj[colorName];
    Object.keys(colorObj).forEach((modifier) => {
      const colorValue = colorObj[modifier];
      vars.comment(() => [
        `/**`,
        ` * @name 		    ${colorName}`,
        ` * @modifier        ${modifier}`,
        ` * @namespace       sugar.css.theme.${__STheme.name}.colors`,
        ` * @type            color`,
        ` * @platform       css`,
        ` * @status         stable`,
        ` *`,
        ` * This is the "${colorName}${modifier !== "default" ? `-${modifier}` : ""}" registered color`,
        ` *`,
        ` * @color 		${colorValue}`,
        ` */`
      ].join("\n"));
    });
  });
  return vars;
}
export {
  docblocks_default as default,
  postcssSugarPluginDocblockColorsMixinInterface as interface
};
