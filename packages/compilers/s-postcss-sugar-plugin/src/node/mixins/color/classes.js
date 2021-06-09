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
                ` * @name           *:${colorName}->${innerColorName}`,
                ` * @namespace      sugar.css.color.classes.${innerColorName}`,
                ` * @type           CssClass`,
                ` *`,
                ` * This class allows you to remap the accent color to the "${innerColorName}" color `,
                ` *`,
                ` * @example        html`,
                ` * <h1 class=":${colorName}->${innerColorName}">`,
                ` *     <span class="s-color:${colorName}">Something cool</span>`,
                ` * </h1>`,
                ` */`,
                `[class*=":${colorName}->${innerColorName}"] {`,
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
                modifierStr = `:${colorVariantName}`;
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
                    ` * @name           s-color:${colorName}${modifierStr}`,
                    ` * @namespace      sugar.css.color.classes.${colorName}.${colorVariantName}`,
                    ` * @type           CssClass`,
                    ` *`,
                    ` * This class allows you to apply the "${colorName}${modifierStr}" color to an HTMLElement`,
                    ` *`,
                    ` * @example        html`,
                    ` * <h1 class="s-color:${colorName}${modifierStr}">`,
                    ` *     Something cool`,
                    ` * </h1>`,
                    ` */`,
                    `[class*="s-color:${colorName}${modifierStr}"] {`,
                    `   color: sugar.color(${colorName},${colorVariantName});`,
                    `}`
                ].join('\n'));
                cssArray.push([
                    `/**`,
                    ` * @name           s-bg:${colorName}${modifierStr}`,
                    ` * @namespace      sugar.css.color.classes.bg.${colorName}.${colorVariantName}`,
                    ` * @type           CssClass`,
                    ` *`,
                    ` * This class allows you to apply the "${colorName}${modifierStr}" color to the background of an HTMLElement`,
                    ` *`,
                    ` * @example        html`,
                    ` * <h1 class="s-bg:${colorName}${modifierStr}">`,
                    ` *     Something cool`,
                    ` * </h1>`,
                    ` */`,
                    `[class*="s-bg:${colorName}${modifierStr}"] {`,
                    `   background-color: sugar.color(${colorName},${colorVariantName})`,
                    `}`
                ].join('\n'));
            }
        });
    });
    replaceWith(cssArray);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxPQUFPLE1BQU0sbUJBQW1CLENBQUM7QUFDeEMsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxlQUFlLE1BQU0sMkNBQTJDLENBQUM7QUFFeEUsTUFBTSx1Q0FBd0MsU0FBUSxZQUFZOztBQUN6RCxrREFBVSxHQUFHLEVBQUUsQ0FBQztBQUV6QixPQUFPLEVBQUUsdUNBQXVDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFaEU7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUU7SUFDdEQsTUFBTSxTQUFTLEdBQUcsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRTVDLE1BQU0sUUFBUSxHQUFhLEVBQUUsQ0FBQztJQUU5QixNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3RDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtRQUMzQixNQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFdEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLGNBQWMsRUFBRSxFQUFFO1lBRWhDLElBQUksY0FBYyxLQUFLLFNBQVM7Z0JBQUUsT0FBTztZQUV6QyxRQUFRLENBQUMsSUFBSSxDQUNQO2dCQUNFLEtBQUs7Z0JBQ0wsd0JBQXdCLFNBQVMsS0FBSyxjQUFjLEVBQUU7Z0JBQ3RELDhDQUE4QyxjQUFjLEVBQUU7Z0JBQzlELDZCQUE2QjtnQkFDN0IsSUFBSTtnQkFDSiw4REFBOEQsY0FBYyxVQUFVO2dCQUN0RixJQUFJO2dCQUNKLHlCQUF5QjtnQkFDekIsa0JBQWtCLFNBQVMsS0FBSyxjQUFj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