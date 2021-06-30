import __theme from '../../utils/theme';
import __SInterface from '@coffeekraken/s-interface';
import __isPlainObject from '@coffeekraken/sugar/shared/is/plainObject';

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
export default function ({ params, atRule, replaceWith }) {
  const colorsObj = __theme().config('color');

  const cssArray: string[] = [];

  const colors = Object.keys(colorsObj);
  colors.forEach((colorName) => {
    const colorObj = colorsObj[colorName];

    colors.forEach((innerColorName) => {

      if (innerColorName === colorName) return;

      cssArray.push(
            [
              `/**`,
              ` * @name           s-color--${colorName}->${innerColorName}`,
              ` * @namespace      sugar.css.color.classes.${innerColorName}`,
              ` * @type           CssClass`,
              ` *`,
              ` * This class allows you to remap the accent color to the "${innerColorName}" color `,
              ` *`,
              ` * @example        html`,
              ` * <h1 class="s-color--${colorName}->${innerColorName}">`,
              ` *     <span class="s-color--${colorName}">Something cool</span>`,
              ` * </h1>`,
              ` */`,
              `[class*="s-color--${colorName}->${innerColorName}"] {`,
              ` @sugar.color.remap(${colorName}, ${innerColorName})`,
              `}`
            ].join('\n')
          );
    });

    Object.keys(colorObj).forEach((colorVariantName) => {
      if (colorVariantName.match(/-[hslrgba]$/)) return;

      let modifierStr = '';
      if (colorVariantName.match(/^default/)) {
        modifierStr = ``;
        colorVariantName = '';
      } else {
        modifierStr = `-${colorVariantName}`;
      }
      
      cssArray.push(
        [
          `/**`,
          ` * @name           s-color--${colorName}${modifierStr}`,
          ` * @namespace      sugar.css.color.classes.${colorName}.${colorVariantName}`,
          ` * @type           CssClass`,
          ` *`,
          ` * This class allows you to apply the "${colorName}${modifierStr}" color to an HTMLElement`,
          ` *`,
          ` * @example        html`,
          ` * <h1 class="s-color--${colorName}${modifierStr}">`,
          ` *     Something cool`,
          ` * </h1>`,
          ` */`,
          `.s-color--${colorName}${modifierStr} {`,
          `   color: sugar.color(${colorName},${colorVariantName});`,
          `}`
        ].join('\n')
      );

      cssArray.push(
        [
          `/**`,
          ` * @name           s-bg--${colorName}${modifierStr}`,
          ` * @namespace      sugar.css.color.classes.bg.${colorName}.${colorVariantName}`,
          ` * @type           CssClass`,
          ` *`,
          ` * This class allows you to apply the "${colorName}${modifierStr}" color to the background of an HTMLElement`,
          ` *`,
          ` * @example        html`,
          ` * <h1 class="s-bg--${colorName}${modifierStr}">`,
          ` *     Something cool`,
          ` * </h1>`,
          ` */`,
          `.s-bg--${colorName}${modifierStr} {`,
          `   background-color: sugar.color(${colorName},${colorVariantName})`,
          `}`
        ].join('\n')
      );
    });

    cssArray.push(
      [
        `/**`,
        ` * @name           s-gradient--${colorName}`,
        ` * @namespace      sugar.css.color.classes.gradient.${colorName}`,
        ` * @type           CssClass`,
        ` *`,
        ` * This class allows you to apply the "${colorName}" color gradient to the background of an HTMLElement`,
        ` *`,
        ` * @example        html`,
        ` * <h1 class="s-gradient--${colorName}">`,
        ` *     Something cool`,
        ` * </h1>`,
        ` */`,
        `.s-gradient--${colorName} {`,
        `   @sugar.gradient.linear(sugar.color(${colorName}, gradientStart), sugar.color(${colorName}, gradientEnd), $angle: 90deg);`,
        `}`
      ].join('\n')
    );

  });

  cssArray.push(
        [
          `/**`,
          ` * @name           s-bg--odd`,
          ` * @namespace      sugar.css.bg.classes`,
          ` * @type           CssClass`,
          ` *`,
          ` * This class allows you to scope the applied bgs on the direct childs to only be applied on "odd" HTMLElement`,
          ` *`,
          ` * @example        html`,
          ` * <ol class="s-bg--odd">`,
          ` *     <li class="s-bg--accent">Something cool</li>`,
          ` *     <li class="s-bg--accent">Something cool</li>`,
          ` *     <li class="s-bg--accent">Something cool</li>`,
          ` * </li>`,
          ` */`,
          `.s-bg--odd > *:nth-child(even) {`,
          '   background-color: transparent !important;',
          `}`
        ].join('\n')
      );
    cssArray.push(
        [
          `/**`,
          ` * @name           s-bg--even`,
          ` * @namespace      sugar.css.color.classes`,
          ` * @type           CssClass`,
          ` *`,
          ` * This class allows you to scope the applied colors on the direct childs to only be applied on "even" HTMLElement`,
          ` *`,
          ` * @example        html`,
          ` * <ol class="s-bg--even">`,
          ` *     <li class="s-bg--accent">Something cool</li>`,
          ` *     <li class="s-bg--accent">Something cool</li>`,
          ` *     <li class="s-bg--accent">Something cool</li>`,
          ` * </li>`,
          ` */`,
          `.s-bg--even > *:nth-child(even) {`,
          '   background-color: transparent !important;',
          `}`
        ].join('\n')
      );

  replaceWith(cssArray);
}
