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

        let modifierStr = modifier;
        let modifierInvertStr = modifier;
        if (modifier.match(/^default/)) {
          if (modifier.match(/\-i$/)) {
            modifierStr = '--i';
            modifierInvertStr = '';
          } else {
            modifierStr = ``;
            modifierInvertStr = '--i';
          }
        } else {
          if (modifier.match(/\-i$/)) {
            modifierStr = `--${modifier}`;
            modifierInvertStr = `--${modifier.replace(/\-i$/, '')}`;
          } else {
            modifierStr = `--${modifier}`;
            modifierInvertStr = `--${modifier}-i`;
          }
        }

        cssArray.push(
          [
            `/**`,
            ` * @name           c-${colorName}${modifierStr}`,
            ` * @namespace      sugar.color.classes`,
            ` * @type           CssClass`,
            ` *`,
            ` * This class allows you to apply the "${colorName}${modifierStr}" color to an HTMLElement`,
            ` *`,
            ` * @example        html`,
            ` * <h1 class="c-${colorName}${modifierStr}">`,
            ` *     Something cool`,
            ` * </h1>`,
            ` */`,
            `.c-${colorName}${modifierStr} {`,
            `   color: ${__colorFn({
              name: colorName,
              modifier
            })}`,
            `}`
          ].join('\n')
        );

        cssArray.push(
          [
            `/**`,
            ` * @name           bg-${colorName}${modifierStr}`,
            ` * @namespace      sugar.color.classes`,
            ` * @type           CssClass`,
            ` *`,
            ` * This class allows you to apply the "${colorName}${modifierStr}" color to the background of an HTMLElement`,
            ` *`,
            ` * @example        html`,
            ` * <h1 class="bg-${colorName}${modifierStr} c-${colorName}${modifierInvertStr}">`,
            ` *     Something cool`,
            ` * </h1>`,
            ` */`,
            `.bg-${colorName}${modifierStr} {`,
            `   background-color: ${__colorFn({
              name: colorName,
              modifier
            })}`,
            `}`
          ].join('\n')
        );
      });
    });
  });

  console.log(cssArray.join('\n'));

  if (atRule) {
    const AST = __postCss.parse(cssArray.join('\n'));
    atRule.replaceWith(AST);
  } else {
    return cssArray.join('\n');
  }
}
