import __sugarConfig from '@coffeekraken/s-sugar-config';
import __SInterface from '@coffeekraken/s-interface';

class postcssSugarPluginDocblockColorsMixinInterface extends __SInterface {
  static definition = {};
}
export { postcssSugarPluginDocblockColorsMixinInterface as interface };

/**
 * @name           docblocks
 * @namespace      mixins.color
 * @type           Mixin
 * @status        beta
 *
 * This mixin print the documentation docblocks for the colors
 * into your final css.
 *
 * @param       {String}        query       The query string like ">tablet", "<=desktop", etc...
 *
 * @example         postcss
 * \@sugar.color.docblocks;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function (params = {}, atRule, processNested) {
  const themes = __sugarConfig('theme');

  const cssArray: string[] = [];

  Object.keys(themes).forEach((themeName) => {
    const themeObj = themes[themeName];
    if (!themeObj.color) return;
    const colors = Object.keys(themeObj.color);
    colors.forEach((colorName) => {
      const colorObj = themeObj.color[colorName];
      Object.keys(colorObj).forEach((modifier) => {
        const colorValue = colorObj[modifier];
        cssArray.push(
          [
            `/**`,
            ` * @name 		    ${colorName}`,
            ` * @modifier        ${modifier}`,
            ` * @namespace       theme.${themeName}.colors`,
            ` * @type            color`,
            ` *`,
            ` * This is the "${colorName}${
              modifier !== 'default' ? `-${modifier}` : ''
            }" registered color`,
            ` *`,
            ` * @color 		${colorValue}`,
            ` */`
          ].join('\n')
        );
      });
    });
  });

  const AST = processNested(cssArray.join('\n'));
  atRule.replaceWith(AST);
}
