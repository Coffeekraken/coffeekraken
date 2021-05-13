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
        Object.keys(colorObj).forEach((modifier) => {
            let modifierStr = '';
            if (modifier.match(/^default/)) {
                modifierStr = `--${modifier}`;
                modifier = '';
            }
            else {
                modifierStr = modifier;
            }
            cssArray.push([
                `/**`,
                ` * @name           s-c-${colorName}${modifierStr}`,
                ` * @namespace      sugar.css.color.classes.${colorName}.${modifier}`,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxPQUFPLE1BQU0sbUJBQW1CLENBQUM7QUFDeEMsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQsTUFBTSx1Q0FBd0MsU0FBUSxZQUFZOztBQUN6RCxrREFBVSxHQUFHLEVBQUUsQ0FBQztBQUV6QixPQUFPLEVBQUUsdUNBQXVDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFaEU7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUU7SUFDeEQsTUFBTSxTQUFTLEdBQUcsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRTVDLE1BQU0sUUFBUSxHQUFhLEVBQUUsQ0FBQztJQUU5QixNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3RDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtRQUMzQixNQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdEMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUN6QyxJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUM7WUFDckIsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUM5QixXQUFXLEdBQUcsS0FBSyxRQUFRLEVBQUUsQ0FBQztnQkFDOUIsUUFBUSxHQUFHLEVBQUUsQ0FBQzthQUNmO2lCQUFNO2dCQUNMLFdBQVcsR0FBRyxRQUFRLENBQUM7YUFDeEI7WUFFRCxRQUFRLENBQUMsSUFBSSxDQUNYO2dCQUNFLEtBQUs7Z0JBQ0wsMEJBQTBCLFNBQVMsR0FBRyxXQUFXLEVBQUU7Z0JBQ25ELDhDQUE4QyxTQUFTLElBQUksUUFBUSxFQUFFO2dCQUNyRSw2QkFBNkI7Z0JBQzdCLElBQUk7Z0JBQ0osMENBQTBDLFNBQVMsR0FBRyxXQUFXLDJCQUEyQjtnQkFDNUYsSUFBSTtnQkFDSix5QkFBeUI7Z0JBQ3pCLHFCQUFxQixTQUFTLEdBQUcsV0FBVyxJQUFJO2dCQUNoRCx1QkFBdUI7Z0JBQ3ZCLFVBQVU7Z0JBQ1YsS0FBSztnQkFDTCxRQUFRLFNBQVMsR0FBRyxXQUFXLElBQUk7Z0JBQ25DLHlCQUF5QixTQUFTLElBQUksUUFBUSxJQUFJO2dCQUNsRCxHQUFHO2FBQ0osQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQ2IsQ0FBQztZQUVGLFFBQVEsQ0FBQyxJQUFJLENBQ1g7Z0JBQ0UsS0FBSztnQkFDTCwyQkFBMkIsU0FBUyxHQUFHLFdBQVcsRUFBRTtnQkFDcEQsaURBQWlELFNBQVMsSUFBSSxRQUFRLEVBQUU7Z0JBQ3hFLDZCQUE2QjtnQkFDN0IsSUFBSTtnQkFDSiwwQ0FBMEMsU0FBUyxHQUFHLFdBQVcsNkNBQTZDO2dCQUM5RyxJQUFJO2dCQUNKLHlCQUF5QjtnQkFDekIsc0JBQXNCLFNBQVMsR0FBRyxXQUFXLElBQUk7Z0JBQ2pELHVCQUF1QjtnQkFDdkIsVUFBVTtnQkFDVixLQUFLO2dCQUNMLFNBQVMsU0FBUyxHQUFHLFdBQVcsSUFBSTtnQkFDcEMsb0NBQW9DLFNBQVMsSUFBSSxRQUFRLEdBQUc7Z0JBQzVELEdBQUc7YUFDSixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDYixDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILE1BQU0sR0FBRyxHQUFHLGFBQWEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDL0MsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMxQixDQUFDIn0=