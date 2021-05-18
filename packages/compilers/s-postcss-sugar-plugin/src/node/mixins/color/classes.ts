import __theme from '../../utils/theme';
import __SInterface from '@coffeekraken/s-interface';
import sugar from '@coffeekraken/s-sugar-config';

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
export default function ({ params, atRule, processNested }) {
  const colorsObj = __theme().config('color');

  const cssArray: string[] = [];

  const colors = Object.keys(colorsObj);
  colors.forEach((colorName) => {
    const colorObj = colorsObj[colorName];

    cssArray.push(
      [
        `/**`,
        ` * @name           s-current-color-${colorName}`,
        ` * @namespace      sugar.css.color.classes.${colorName}`,
        ` * @type           CssClass`,
        ` *`,
        ` * This class allows you to apply the "${colorName}" color to an HTMLElement`,
        ` *`,
        ` * @example        html`,
        ` * <h1 class="s-current-color-${colorName}">`,
        ` *     Something cool`,
        ` * </h1>`,
        ` */`,
        `.s-current-color-${colorName} {`,
        `   @sugar.color.current(${colorName})`,
        `}`
      ].join('\n')
    );

    Object.keys(colorObj).forEach((modifier) => {
      if (modifier.match(/-[hslrgba]$/)) return;

      let modifierStr = '';
      if (modifier.match(/^default/)) {
        modifierStr = ``;
        modifier = '';
      } else {
        modifierStr = `-${modifier}`;
      }

      cssArray.push(
        [
          `/**`,
          ` * @name           s-color-${colorName}${modifierStr}`,
          ` * @namespace      sugar.css.color.classes.${colorName}.${modifier}`,
          ` * @type           CssClass`,
          ` *`,
          ` * This class allows you to apply the "${colorName}${modifierStr}" color to an HTMLElement`,
          ` *`,
          ` * @example        html`,
          ` * <h1 class="s-color-${colorName}${modifierStr}">`,
          ` *     Something cool`,
          ` * </h1>`,
          ` */`,
          `.s-color-${colorName}${modifierStr} {`,
          `   color: sugar.color(${colorName},${modifier});`,
          `}`
        ].join('\n')
      );

      cssArray.push(
        [
          `/**`,
          ` * @name           s-bg-${colorName}${modifierStr}`,
          ` * @namespace      sugar.css.color.classes.bg.${colorName}.${modifier}`,
          ` * @type           CssClass`,
          ` *`,
          ` * This class allows you to apply the "${colorName}${modifierStr}" color to the background of an HTMLElement`,
          ` *`,
          ` * @example        html`,
          ` * <h1 class="s-bg-${colorName}${modifierStr}">`,
          ` *     Something cool`,
          ` * </h1>`,
          ` */`,
          `.s-bg-${colorName}${modifierStr} {`,
          `   background-color: sugar.color(${colorName},${modifier})`,
          `}`
        ].join('\n')
      );
    });
  });

  const AST = processNested(cssArray.join('\n'));
  atRule.replaceWith(AST);
}
