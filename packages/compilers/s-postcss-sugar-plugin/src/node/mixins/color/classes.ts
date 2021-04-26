import __theme from '../../utils/theme';
import __SInterface from '@coffeekraken/s-interface';

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
export default function (params = {}, atRule, processNested) {
  const colorsObj = __theme().config('color');

  const cssArray: string[] = [];

  const colors = Object.keys(colorsObj);
  colors.forEach((colorName) => {
    const colorObj = colorsObj[colorName];
    Object.keys(colorObj).forEach((modifier) => {
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
          ` * @name           s-c-${colorName}${modifierStr}`,
          ` * @namespace      sugar.css.color.classes`,
          ` * @type           CssClass`,
          ` *`,
          ` * This class allows you to apply the "${colorName}${modifierStr}" color to an HTMLElement`,
          ` *`,
          ` * @example        html`,
          ` * <h1 class="s-c-${colorName}${modifierStr}">`,
          ` *     Something cool`,
          ` * </h1>`,
          ` */`,
          `.s-c-${colorName}${modifierStr} {`,
          `   color: sugar.color(${colorName}${modifierStr});`,
          `}`
        ].join('\n')
      );

      cssArray.push(
        [
          `/**`,
          ` * @name           s-bg-${colorName}${modifierStr}`,
          ` * @namespace      sugar.css.color.classes`,
          ` * @type           CssClass`,
          ` *`,
          ` * This class allows you to apply the "${colorName}${modifierStr}" color to the background of an HTMLElement`,
          ` *`,
          ` * @example        html`,
          ` * <h1 class="s-bg-${colorName}${modifierStr} c-${colorName}${modifierInvertStr}">`,
          ` *     Something cool`,
          ` * </h1>`,
          ` */`,
          `.s-bg-${colorName}${modifierStr} {`,
          `   background-color: sugar.color(${colorName}${modifierStr})`,
          `}`
        ].join('\n')
      );
    });
  });

  const AST = processNested(cssArray.join('\n'));
  atRule.replaceWith(AST);
}
