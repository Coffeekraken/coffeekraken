import __theme from '../../utils/theme';
import __SInterface from '@coffeekraken/s-interface';
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
        cssArray.push([
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
        ].join('\n'));
        Object.keys(colorObj).forEach((modifier) => {
            if (modifier.match(/-[hslrgba]$/))
                return;
            let modifierStr = '';
            if (modifier.match(/^default/)) {
                modifierStr = ``;
                modifier = '';
            }
            else {
                modifierStr = `-${modifier}`;
            }
            cssArray.push([
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
            ].join('\n'));
            cssArray.push([
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
            ].join('\n'));
        });
    });
    const AST = processNested(cssArray.join('\n'));
    atRule.replaceWith(AST);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxPQUFPLE1BQU0sbUJBQW1CLENBQUM7QUFDeEMsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFHckQsTUFBTSx1Q0FBd0MsU0FBUSxZQUFZOztBQUN6RCxrREFBVSxHQUFHLEVBQUUsQ0FBQztBQUV6QixPQUFPLEVBQUUsdUNBQXVDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFaEU7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUU7SUFDeEQsTUFBTSxTQUFTLEdBQUcsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRTVDLE1BQU0sUUFBUSxHQUFhLEVBQUUsQ0FBQztJQUU5QixNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3RDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtRQUMzQixNQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFdEMsUUFBUSxDQUFDLElBQUksQ0FDWDtZQUNFLEtBQUs7WUFDTCxzQ0FBc0MsU0FBUyxFQUFFO1lBQ2pELDhDQUE4QyxTQUFTLEVBQUU7WUFDekQsNkJBQTZCO1lBQzdCLElBQUk7WUFDSiwwQ0FBMEMsU0FBUywyQkFBMkI7WUFDOUUsSUFBSTtZQUNKLHlCQUF5QjtZQUN6QixpQ0FBaUMsU0FBUyxJQUFJO1lBQzlDLHVCQUF1QjtZQUN2QixVQUFVO1lBQ1YsS0FBSztZQUNMLG9CQUFvQixTQUFTLElBQUk7WUFDakMsMkJBQTJCLFNBQVMsR0FBRztZQUN2QyxHQUFHO1NBQ0osQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQ2IsQ0FBQztRQUVGLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDekMsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQztnQkFBRSxPQUFPO1lBRTFDLElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQztZQUNyQixJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEVBQUU7Z0JBQzlCLFdBQVcsR0FBRyxFQUFFLENBQUM7Z0JBQ2pCLFFBQVEsR0FBRyxFQUFFLENBQUM7YUFDZjtpQkFBTTtnQkFDTCxXQUFXLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQzthQUM5QjtZQUVELFFBQVEsQ0FBQyxJQUFJLENBQ1g7Z0JBQ0UsS0FBSztnQkFDTCw4QkFBOEIsU0FBUyxHQUFHLFdBQVcsRUFBRTtnQkFDdkQsOENBQThDLFNBQVMsSUFBSSxRQUFRLEVBQUU7Z0JBQ3JFLDZCQUE2QjtnQkFDN0IsSUFBSTtnQkFDSiwwQ0FBMEMsU0FBUyxHQUFHLFdBQVcsMkJBQTJCO2dCQUM1RixJQUFJO2dCQUNKLHlCQUF5QjtnQkFDekIseUJBQXlCLFNBQVMsR0FBRyxXQUFXLElBQUk7Z0JBQ3BELHVCQUF1QjtnQkFDdkIsVUFBVTtnQkFDVixLQUFLO2dCQUNMLFlBQVksU0FBUyxHQUFHLFdBQVcsSUFBSTtnQkFDdkMseUJBQXlCLFNBQVMsSUFBSSxRQUFRLElBQUk7Z0JBQ2xELEdBQUc7YUFDSixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDYixDQUFDO1lBRUYsUUFBUSxDQUFDLElBQUksQ0FDWDtnQkFDRSxLQUFLO2dCQUNMLDJCQUEyQixTQUFTLEdBQUcsV0FBVyxFQUFFO2dCQUNwRCxpREFBaUQsU0FBUyxJQUFJLFFBQVEsRUFBRTtnQkFDeEUsNkJBQTZCO2dCQUM3QixJQUFJO2dCQUNKLDBDQUEwQyxTQUFTLEdBQUcsV0FBVyw2Q0FBNkM7Z0JBQzlHLElBQUk7Z0JBQ0oseUJBQXlCO2dCQUN6QixzQkFBc0IsU0FBUyxHQUFHLFdBQVcsSUFBSTtnQkFDakQsdUJBQXVCO2dCQUN2QixVQUFVO2dCQUNWLEtBQUs7Z0JBQ0wsU0FBUyxTQUFTLEdBQUcsV0FBVyxJQUFJO2dCQUNwQyxvQ0FBb0MsU0FBUyxJQUFJLFFBQVEsR0FBRztnQkFDNUQsR0FBRzthQUNKLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUNiLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxHQUFHLEdBQUcsYUFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMvQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzFCLENBQUMifQ==