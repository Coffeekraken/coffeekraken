import __theme from '../../utils/theme';
import __SInterface from '@coffeekraken/s-interface';
import __isPlainObject from '@coffeekraken/sugar/shared/is/plainObject';
class postcssSugarPluginClassesMixinInterface extends __SInterface {
}
postcssSugarPluginClassesMixinInterface.definition = {};
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
    const cssArray = [];
    const colors = Object.keys(colorsObj);
    colors.forEach((colorName) => {
        const colorObj = colorsObj[colorName];
        colors.forEach((innerColorName) => {
            if (innerColorName === colorName)
                return;
            cssArray.push([
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
            ].join('\n'));
        });
        Object.keys(colorObj).forEach((colorVariantName) => {
            if (colorVariantName.match(/-[hslrgba]$/))
                return;
            const colorVariantValue = colorObj[colorVariantName];
            let modifierStr = '';
            if (colorVariantName.match(/^default/)) {
                modifierStr = ``;
                colorVariantName = '';
            }
            else {
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
            }
            else {
                cssArray.push([
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
                ].join('\n'));
                cssArray.push([
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
                ].join('\n'));
            }
        });
    });
    replaceWith(cssArray);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxPQUFPLE1BQU0sbUJBQW1CLENBQUM7QUFDeEMsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxlQUFlLE1BQU0sMkNBQTJDLENBQUM7QUFFeEUsTUFBTSx1Q0FBd0MsU0FBUSxZQUFZOztBQUN6RCxrREFBVSxHQUFHLEVBQUUsQ0FBQztBQUV6QixPQUFPLEVBQUUsdUNBQXVDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFaEU7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUU7SUFDdEQsTUFBTSxTQUFTLEdBQUcsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRTVDLE1BQU0sUUFBUSxHQUFhLEVBQUUsQ0FBQztJQUU5QixNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3RDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtRQUMzQixNQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFdEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLGNBQWMsRUFBRSxFQUFFO1lBRWhDLElBQUksY0FBYyxLQUFLLFNBQVM7Z0JBQUUsT0FBTztZQUV6QyxRQUFRLENBQUMsSUFBSSxDQUNQO2dCQUNFLEtBQUs7Z0JBQ0wsK0JBQStCLFNBQVMsS0FBSyxjQUFjLEVBQUU7Z0JBQzdELDhDQUE4QyxjQUFjLEVBQUU7Z0JBQzlELDZCQUE2QjtnQkFDN0IsSUFBSTtnQkFDSiw4REFBOEQsY0FBYyxVQUFVO2dCQUN0RixJQUFJO2dCQUNKLHlCQUF5QjtnQkFDekIsMEJBQTBCLFNBQVMsS0FBSyxjQUFj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