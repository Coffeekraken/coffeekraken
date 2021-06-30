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
            let modifierStr = '';
            if (colorVariantName.match(/^default/)) {
                modifierStr = ``;
                colorVariantName = '';
            }
            else {
                modifierStr = `-${colorVariantName}`;
            }
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
        });
        cssArray.push([
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
        ].join('\n'));
    });
    cssArray.push([
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
    ].join('\n'));
    cssArray.push([
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
    ].join('\n'));
    replaceWith(cssArray);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxPQUFPLE1BQU0sbUJBQW1CLENBQUM7QUFDeEMsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFHckQsTUFBTSx1Q0FBd0MsU0FBUSxZQUFZOztBQUN6RCxrREFBVSxHQUFHLEVBQUUsQ0FBQztBQUV6QixPQUFPLEVBQUUsdUNBQXVDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFaEU7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUU7SUFDdEQsTUFBTSxTQUFTLEdBQUcsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRTVDLE1BQU0sUUFBUSxHQUFhLEVBQUUsQ0FBQztJQUU5QixNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3RDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtRQUMzQixNQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFdEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLGNBQWMsRUFBRSxFQUFFO1lBRWhDLElBQUksY0FBYyxLQUFLLFNBQVM7Z0JBQUUsT0FBTztZQUV6QyxRQUFRLENBQUMsSUFBSSxDQUNQO2dCQUNFLEtBQUs7Z0JBQ0wsK0JBQStCLFNBQVMsS0FBSyxjQUFjLEVBQUU7Z0JBQzdELDhDQUE4QyxjQUFjLEVBQUU7Z0JBQzlELDZCQUE2QjtnQkFDN0IsSUFBSTtnQkFDSiw4REFBOEQsY0FBYyxVQUFVO2dCQUN0RixJQUFJO2dCQUNKLHlCQUF5QjtnQkFDekIsMEJBQTBCLFNBQVMsS0FBSyxjQUFjLElBQUk7Z0JBQzFELGdDQUFnQyxTQUFTLHlCQUF5QjtnQkFDbEUsVUFBVTtnQkFDVixLQUFLO2dCQUNMLHFCQUFxQixTQUFTLEtBQUssY0FBYyxNQUFNO2dCQUN2RCx1QkFBdUIsU0FBUyxLQUFLLGNBQWMsR0FBRztnQkFDdEQsR0FBRzthQUNKLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUNiLENBQUM7UUFDUixDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsZ0JBQWdCLEVBQUUsRUFBRTtZQUNqRCxJQUFJLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUM7Z0JBQUUsT0FBTztZQUVsRCxJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUM7WUFDckIsSUFBSSxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEVBQUU7Z0JBQ3RDLFdBQVcsR0FBRyxFQUFFLENBQUM7Z0JBQ2pCLGdCQUFnQixHQUFHLEVBQUUsQ0FBQzthQUN2QjtpQkFBTTtnQkFDTCxXQUFXLEdBQUcsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDO2FBQ3RDO1lBRUQsUUFBUSxDQUFDLElBQUksQ0FDWDtnQkFDRSxLQUFLO2dCQUNMLCtCQUErQixTQUFTLEdBQUcsV0FBVyxFQUFFO2dCQUN4RCw4Q0FBOEMsU0FBUyxJQUFJLGdCQUFnQixFQUFFO2dCQUM3RSw2QkFBNkI7Z0JBQzdCLElBQUk7Z0JBQ0osMENBQTBDLFNBQVMsR0FBRyxXQUFXLDJCQUEyQjtnQkFDNUYsSUFBSTtnQkFDSix5QkFBeUI7Z0JBQ3pCLDBCQUEwQixTQUFTLEdBQUcsV0FBVyxJQUFJO2dCQUNyRCx1QkFBdUI7Z0JBQ3ZCLFVBQVU7Z0JBQ1YsS0FBSztnQkFDTCxhQUFhLFNBQVMsR0FBRyxXQUFXLElBQUk7Z0JBQ3hDLHlCQUF5QixTQUFTLElBQUksZ0JBQWdCLElBQUk7Z0JBQzFELEdBQUc7YUFDSixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDYixDQUFDO1lBRUYsUUFBUSxDQUFDLElBQUksQ0FDWDtnQkFDRSxLQUFLO2dCQUNMLDRCQUE0QixTQUFTLEdBQUcsV0FBVyxFQUFFO2dCQUNyRCxpREFBaUQsU0FBUyxJQUFJLGdCQUFnQixFQUFFO2dCQUNoRiw2QkFBNkI7Z0JBQzdCLElBQUk7Z0JBQ0osMENBQTBDLFNBQVMsR0FBRyxXQUFXLDZDQUE2QztnQkFDOUcsSUFBSTtnQkFDSix5QkFBeUI7Z0JBQ3pCLHVCQUF1QixTQUFTLEdBQUcsV0FBVyxJQUFJO2dCQUNsRCx1QkFBdUI7Z0JBQ3ZCLFVBQVU7Z0JBQ1YsS0FBSztnQkFDTCxVQUFVLFNBQVMsR0FBRyxXQUFXLElBQUk7Z0JBQ3JDLG9DQUFvQyxTQUFTLElBQUksZ0JBQWdCLEdBQUc7Z0JBQ3BFLEdBQUc7YUFDSixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDYixDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsSUFBSSxDQUNYO1lBQ0UsS0FBSztZQUNMLGtDQUFrQyxTQUFTLEVBQUU7WUFDN0MsdURBQXVELFNBQVMsRUFBRTtZQUNsRSw2QkFBNkI7WUFDN0IsSUFBSTtZQUNKLDBDQUEwQyxTQUFTLHNEQUFzRDtZQUN6RyxJQUFJO1lBQ0oseUJBQXlCO1lBQ3pCLDZCQUE2QixTQUFTLElBQUk7WUFDMUMsdUJBQXVCO1lBQ3ZCLFVBQVU7WUFDVixLQUFLO1lBQ0wsZ0JBQWdCLFNBQVMsSUFBSTtZQUM3Qix5Q0FBeUMsU0FBUyxpQ0FBaUMsU0FBUyxpQ0FBaUM7WUFDN0gsR0FBRztTQUNKLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUNiLENBQUM7SUFFSixDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyxJQUFJLENBQ1A7UUFDRSxLQUFLO1FBQ0wsOEJBQThCO1FBQzlCLHlDQUF5QztRQUN6Qyw2QkFBNkI7UUFDN0IsSUFBSTtRQUNKLGdIQUFnSDtRQUNoSCxJQUFJO1FBQ0oseUJBQXlCO1FBQ3pCLDJCQUEyQjtRQUMzQixxREFBcUQ7UUFDckQscURBQXFEO1FBQ3JELHFEQUFxRDtRQUNyRCxVQUFVO1FBQ1YsS0FBSztRQUNMLGtDQUFrQztRQUNsQyw4Q0FBOEM7UUFDOUMsR0FBRztLQUNKLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUNiLENBQUM7SUFDSixRQUFRLENBQUMsSUFBSSxDQUNUO1FBQ0UsS0FBSztRQUNMLCtCQUErQjtRQUMvQiw0Q0FBNEM7UUFDNUMsNkJBQTZCO1FBQzdCLElBQUk7UUFDSixvSEFBb0g7UUFDcEgsSUFBSTtRQUNKLHlCQUF5QjtRQUN6Qiw0QkFBNEI7UUFDNUIscURBQXFEO1FBQ3JELHFEQUFxRDtRQUNyRCxxREFBcUQ7UUFDckQsVUFBVTtRQUNWLEtBQUs7UUFDTCxtQ0FBbUM7UUFDbkMsOENBQThDO1FBQzlDLEdBQUc7S0FDSixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDYixDQUFDO0lBRU4sV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3hCLENBQUMifQ==