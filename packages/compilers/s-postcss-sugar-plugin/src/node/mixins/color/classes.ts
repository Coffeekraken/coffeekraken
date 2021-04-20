import __sugarConfig from '@coffeekraken/s-sugar-config';
import __postCss from 'postcss';
import __SInterface from '@coffeekraken/s-interface';
import __colorFn from '../../functions/color/default';

class postcssSugarPluginClassesMixinInterface extends __SInterface {
  static definition = {};
}
export { postcssSugarPluginClassesMixinInterface as interface };

/**
 * @name           classes
 * @namespace      mixins.colors
 * @type           Mixin
 * @status        beta
 *
 * This mixin print the documentation docblocks for the colors
 * into your final css.
 *
 * @param       {String}        query       The query string like ">tablet", "<=desktop", etc...
 *
 * @example         postcss
 * \@sugar.Classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function (params = {}, atRule = null) {
  const themes = __sugarConfig('theme');

  const cssArray: string[] = [];

  Object.keys(themes).forEach((themeName) => {
    const themeObj = themes[themeName];
    const colors = Object.keys(themeObj.colors);
    colors.forEach((colorName) => {
      const colorObj = themeObj.colors[colorName];
      Object.keys(colorObj).forEach((modifier) => {
        const colorValue = colorObj[modifier];

        cssArray.push(
          [
            `/**`,
            ` * @name           ${colorName}${
              modifier === 'default' ? '' : `--${modifier}`
            }`,
            ` * @namespace      sugar.color.classes`,
            ` * @type           CssClass`,
            ` *`,
            ` * This class allows you to apply the "${colorName}${
              modifier === 'default' ? '' : `--${modifier}`
            }" color to an HTMLElement`,
            ` *`,
            ` * @example        html`,
            ` * <h1 class="c-${colorName}${
              modifier === 'default' ? '' : `--${modifier}`
            }">`,
            ` *     Something cool`,
            ` * </h1>`,
            ` */`,
            `.c-${colorName}${modifier !== 'default' ? `--${modifier}` : ''} {`,
            `   color: ${__colorFn({
              name: colorName,
              modifier
            })}`,
            `}`
          ].join('\n')
        );
      });
    });
  });

  if (atRule) {
    const AST = __postCss.parse(cssArray.join('\n'));
    atRule.replaceWith(AST);
  } else {
    return cssArray.join('\n');
  }
}
