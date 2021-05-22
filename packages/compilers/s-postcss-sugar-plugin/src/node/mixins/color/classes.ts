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
export default function ({ params, atRule, processNested }) {
  const colorsObj = __theme().config('color');

  const cssArray: string[] = [];

  const colors = Object.keys(colorsObj);
  colors.forEach((colorName) => {
    const colorObj = colorsObj[colorName];

    Object.keys(colorObj).forEach((colorVariantName) => {
      if (colorVariantName.match(/-[hslrgba]$/)) return;

      const colorVariantValue = colorObj[colorVariantName];

      let modifierStr = '';
      if (colorVariantName.match(/^default/)) {
        modifierStr = ``;
        colorVariantName = '';
      } else {
        modifierStr = `-${colorVariantName}`;
      }

      if (colorVariantName.match(/^:/) && __isPlainObject(colorVariantValue)) {
        // Object.keys(colorVariantValue).forEach((modifierName) => {
        //   let className;
        //   switch (colorVariantName) {
        //     case ':hover':
        //       className = `[hoverable]:hover:not([hoverable]:not(:hover) &)`;
        //       break;
        //     case ':focus':
        //       className = '*:focus, *:focus-within';
        //       break;
        //     case ':active':
        //       className = `*:active`;
        //       break;
        //   }
        //   cssArray.push(`
        //     .${className} {
        //     }
        //   `);
        // });
      } else {
        cssArray.push(
          [
            `/**`,
            ` * @name           s-color-${colorName}${modifierStr}`,
            ` * @namespace      sugar.css.color.classes.${colorName}.${colorVariantName}`,
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
            `   color: sugar.color(${colorName},${colorVariantName});`,
            `}`
          ].join('\n')
        );

        cssArray.push(
          [
            `/**`,
            ` * @name           s-bg-${colorName}${modifierStr}`,
            ` * @namespace      sugar.css.color.classes.bg.${colorName}.${colorVariantName}`,
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
            `   background-color: sugar.color(${colorName},${colorVariantName})`,
            `}`
          ].join('\n')
        );

        cssArray.push(
          [
            `/**`,
            ` * @name           s-cs-base-${colorName}`,
            ` * @namespace      sugar.css.color.classes.cs.base.${colorName}`,
            ` * @type           CssClass`,
            ` *`,
            ` * This class allows you to apply the "${colorName}${modifierStr}" color to the background of an HTMLElement`,
            ` *`,
            ` * @example        html`,
            ` * <h1 class="s-cs-base-${colorName}">`,
            ` *     Something cool`,
            ` * </h1>`,
            ` */`,
            `.s-cs-base-${colorName} {`,
            `   @sugar.color.schema(${colorName})`,
            `}`
          ].join('\n')
        );

        cssArray.push(
          [
            `/**`,
            ` * @name           s-cs-accent-${colorName}`,
            ` * @namespace      sugar.css.color.classes.cs.accent.${colorName}`,
            ` * @type           CssClass`,
            ` *`,
            ` * This class allows you to apply the "${colorName}${modifierStr}" color to the background of an HTMLElement`,
            ` *`,
            ` * @example        html`,
            ` * <h1 class="s-cs-accent-${colorName}">`,
            ` *     Something cool`,
            ` * </h1>`,
            ` */`,
            `.s-cs-accent-${colorName} {`,
            `   @sugar.color.schema('', ${colorName})`,
            `}`
          ].join('\n')
        );

        cssArray.push(
          [
            `/**`,
            ` * @name           s-cs-complementary-${colorName}`,
            ` * @namespace      sugar.css.color.classes.cs.complementary.${colorName}`,
            ` * @type           CssClass`,
            ` *`,
            ` * This class allows you to apply the "${colorName}${modifierStr}" color to the background of an HTMLElement`,
            ` *`,
            ` * @example        html`,
            ` * <h1 class="s-cs-complementary-${colorName}">`,
            ` *     Something cool`,
            ` * </h1>`,
            ` */`,
            `.s-cs-complementary-${colorName} {`,
            `   @sugar.color.schema('', '', ${colorName})`,
            `}`
          ].join('\n')
        );
      }
    });
  });

  const AST = processNested(cssArray.join('\n'));
  atRule.replaceWith(AST);
}
