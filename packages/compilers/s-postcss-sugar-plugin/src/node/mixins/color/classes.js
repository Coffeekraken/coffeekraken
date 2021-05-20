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
export default function ({ params, atRule, processNested }) {
    const colorsObj = __theme().config('color');
    const cssArray = [];
    const colors = Object.keys(colorsObj);
    colors.forEach((colorName) => {
        const colorObj = colorsObj[colorName];
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
                Object.keys(colorVariantValue).forEach((modifierName) => {
                    let className;
                    switch (colorVariantName) {
                        case ':hover':
                            className = `[hoverable]:hover:not([hoverable]:not(:hover) &)`;
                            break;
                        case ':focus':
                            className = '*:focus, *:focus-within';
                            break;
                        case ':active':
                            className = `*:active`;
                            break;
                    }
                    cssArray.push(`
            .${className} {
            }
          `);
                });
            }
            else {
                cssArray.push([
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
                ].join('\n'));
                cssArray.push([
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
                ].join('\n'));
            }
        });
    });
    const AST = processNested(cssArray.join('\n'));
    atRule.replaceWith(AST);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxPQUFPLE1BQU0sbUJBQW1CLENBQUM7QUFDeEMsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxlQUFlLE1BQU0sMkNBQTJDLENBQUM7QUFFeEUsTUFBTSx1Q0FBd0MsU0FBUSxZQUFZOztBQUN6RCxrREFBVSxHQUFHLEVBQUUsQ0FBQztBQUV6QixPQUFPLEVBQUUsdUNBQXVDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFaEU7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUU7SUFDeEQsTUFBTSxTQUFTLEdBQUcsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRTVDLE1BQU0sUUFBUSxHQUFhLEVBQUUsQ0FBQztJQUU5QixNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3RDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtRQUMzQixNQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFdEMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFO1lBQ2pELElBQUksZ0JBQWdCLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQztnQkFBRSxPQUFPO1lBRWxELE1BQU0saUJBQWlCLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFFckQsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDO1lBQ3JCLElBQUksZ0JBQWdCLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUN0QyxXQUFXLEdBQUcsRUFBRSxDQUFDO2dCQUNqQixnQkFBZ0IsR0FBRyxFQUFFLENBQUM7YUFDdkI7aUJBQU07Z0JBQ0wsV0FBVyxHQUFHLElBQUksZ0JBQWdCLEVBQUUsQ0FBQzthQUN0QztZQUVELElBQUksZ0JBQWdCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFO2dCQUN0RSxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsWUFBWSxFQUFFLEVBQUU7b0JBQ3RELElBQUksU0FBUyxDQUFDO29CQUNkLFFBQVEsZ0JBQWdCLEVBQUU7d0JBQ3hCLEtBQUssUUFBUTs0QkFDWCxTQUFTLEdBQUcsa0RBQWtELENBQUM7NEJBQy9ELE1BQU07d0JBQ1IsS0FBSyxRQUFROzRCQUNYLFNBQVMsR0FBRyx5QkFBeUIsQ0FBQzs0QkFDdEMsTUFBTTt3QkFDUixLQUFLLFNBQVM7NEJBQ1osU0FBUyxHQUFHLFVBQVUsQ0FBQzs0QkFDdkIsTUFBTTtxQkFDVDtvQkFFRCxRQUFRLENBQUMsSUFBSSxDQUFDO2VBQ1QsU0FBUzs7V0FFYixDQUFDLENBQUM7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7YUFDSjtpQkFBTTtnQkFDTCxRQUFRLENBQUMsSUFBSSxDQUNYO29CQUNFLEtBQUs7b0JBQ0wsOEJBQThCLFNBQVMsR0FBRyxXQUFXLEVBQUU7b0JBQ3ZELDhDQUE4QyxTQUFTLElBQUksZ0JBQWdCLEVBQUU7b0JBQzdFLDZCQUE2QjtvQkFDN0IsSUFBSTtvQkFDSiwwQ0FBMEMsU0FBUyxHQUFHLFdBQVcsMkJBQTJCO29CQUM1RixJQUFJO29CQUNKLHlCQUF5QjtvQkFDekIseUJBQXlCLFNBQVMsR0FBRyxXQUFXLElBQUk7b0JBQ3BELHVCQUF1QjtvQkFDdkIsVUFBVTtvQkFDVixLQUFLO29CQUNMLFlBQVksU0FBUyxHQUFHLFdBQVcsSUFBSTtvQkFDdkMseUJBQXlCLFNBQVMsSUFBSSxnQkFBZ0IsSUFBSTtvQkFDMUQsR0FBRztpQkFDSixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDYixDQUFDO2dCQUVGLFFBQVEsQ0FBQyxJQUFJLENBQ1g7b0JBQ0UsS0FBSztvQkFDTCwyQkFBMkIsU0FBUyxHQUFHLFdBQVcsRUFBRTtvQkFDcEQsaURBQWlELFNBQVMsSUFBSSxnQkFBZ0IsRUFBRTtvQkFDaEYsNkJBQTZCO29CQUM3QixJQUFJO29CQUNKLDBDQUEwQyxTQUFTLEdBQUcsV0FBVyw2Q0FBNkM7b0JBQzlHLElBQUk7b0JBQ0oseUJBQXlCO29CQUN6QixzQkFBc0IsU0FBUyxHQUFHLFdBQVcsSUFBSTtvQkFDakQsdUJBQXVCO29CQUN2QixVQUFVO29CQUNWLEtBQUs7b0JBQ0wsU0FBUyxTQUFTLEdBQUcsV0FBVyxJQUFJO29CQUNwQyxvQ0FBb0MsU0FBUyxJQUFJLGdCQUFnQixHQUFHO29CQUNwRSxHQUFHO2lCQUNKLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUNiLENBQUM7YUFDSDtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLEdBQUcsR0FBRyxhQUFhLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQy9DLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDMUIsQ0FBQyJ9