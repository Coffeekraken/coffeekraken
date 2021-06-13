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
            //   cssArray.push(
            //         [
            //           `/**`,
            //           ` * @name           s-color--${colorName}->${innerColorName}`,
            //           ` * @namespace      sugar.css.color.classes.${innerColorName}`,
            //           ` * @type           CssClass`,
            //           ` *`,
            //           ` * This class allows you to remap the accent color to the "${innerColorName}" color `,
            //           ` *`,
            //           ` * @example        html`,
            //           ` * <h1 class="s-color--${colorName}->${innerColorName}">`,
            //           ` *     <span class="s-color--${colorName}">Something cool</span>`,
            //           ` * </h1>`,
            //           ` */`,
            //           `[class*="s-color--${colorName}->${innerColorName}"] {`,
            //           ` @sugar.color.remap(${colorName}, ${innerColorName})`,
            //           `}`
            //         ].join('\n')
            //       );
            // });
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
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxPQUFPLE1BQU0sbUJBQW1CLENBQUM7QUFDeEMsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxlQUFlLE1BQU0sMkNBQTJDLENBQUM7QUFFeEUsTUFBTSx1Q0FBd0MsU0FBUSxZQUFZOztBQUN6RCxrREFBVSxHQUFHLEVBQUUsQ0FBQztBQUV6QixPQUFPLEVBQUUsdUNBQXVDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFaEU7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUU7SUFDdEQsTUFBTSxTQUFTLEdBQUcsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRTVDLE1BQU0sUUFBUSxHQUFhLEVBQUUsQ0FBQztJQUU5QixNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3RDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtRQUMzQixNQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFdEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLGNBQWMsRUFBRSxFQUFFO1lBRWhDLElBQUksY0FBYyxLQUFLLFNBQVM7Z0JBQUUsT0FBTztZQUUzQyxtQkFBbUI7WUFDbkIsWUFBWTtZQUNaLG1CQUFtQjtZQUNuQiwyRUFBMkU7WUFDM0UsNEVBQTRFO1lBQzVFLDJDQUEyQztZQUMzQyxrQkFBa0I7WUFDbEIsb0dBQW9HO1lBQ3BHLGtCQUFrQjtZQUNsQix1Q0FBdUM7WUFDdkMsd0VBQXdFO1lBQ3hFLGdGQUFnRjtZQUNoRix3QkFBd0I7WUFDeEIsbUJBQW1CO1lBQ25CLHFFQUFxRTtZQUNy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