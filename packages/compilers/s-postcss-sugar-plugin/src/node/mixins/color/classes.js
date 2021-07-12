import __theme from '../../utils/theme';
import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginClassesMixinInterface extends __SInterface {
}
postcssSugarPluginClassesMixinInterface.definition = {};
export { postcssSugarPluginClassesMixinInterface as interface };
/**
 * @name           classes
 * @namespace      node.mixins.colors
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin allows you to generate all the colors helpers classes like s-color:accent, etc...
 *
 * @return    {Css}         The generated css for color classes
 *
 * @example         postcss
 * \@sugar.color;
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
                ` * @name           s-color:${colorName}->${innerColorName}`,
                ` * @namespace      sugar.css.color.${innerColorName}`,
                ` * @type           CssClass`,
                ` * @platform       css`,
                ` * @status         beta`,
                ` *`,
                ` * This class allows you to remap the accent color to the "${innerColorName}" color `,
                ` *`,
                ` * @example        html`,
                ` * <h1 class="s-color\:${colorName}->${innerColorName}">`,
                ` *     <span class="s-color\:${colorName}">Something cool</span>`,
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
                ` * @name           s-color:${colorName}${modifierStr}`,
                ` * @namespace      sugar.css.color.${colorName}.${colorVariantName}`,
                ` * @type           CssClass`,
                ` * @platform       css`,
                ` * @status         beta`,
                ` *`,
                ` * This class allows you to apply the "${colorName}${modifierStr}" color to an HTMLElement`,
                ` *`,
                ` * @example        html`,
                ` * <h1 class="s-color\:${colorName}${modifierStr}">`,
                ` *     Something cool`,
                ` * </h1>`,
                ` */`,
                `.s-color--${colorName}${modifierStr} {`,
                `   color: sugar.color(${colorName},${colorVariantName});`,
                `}`
            ].join('\n'));
            cssArray.push([
                `/**`,
                ` * @name           s-bg:${colorName}${modifierStr}`,
                ` * @namespace      sugar.css.color.bg.${colorName}.${colorVariantName}`,
                ` * @type           CssClass`,
                ` * @platform       css`,
                ` * @status         beta`,
                ` *`,
                ` * This class allows you to apply the "${colorName}${modifierStr}" color to the background of an HTMLElement`,
                ` *`,
                ` * @example        html`,
                ` * <h1 class="s-bg\:${colorName}${modifierStr}">`,
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
            ` * @name           s-gradient:${colorName}`,
            ` * @namespace      sugar.css.color.gradient.${colorName}`,
            ` * @type           CssClass`,
            ` * @platform       css`,
            ` * @status         beta`,
            ` *`,
            ` * This class allows you to apply the "${colorName}" color gradient to the background of an HTMLElement`,
            ` *`,
            ` * @example        html`,
            ` * <h1 class="s-gradient\:${colorName}">`,
            ` *     Something cool`,
            ` * </h1>`,
            ` */`,
            `.s-gradient--${colorName} {`,
            `   @sugar.gradient(sugar.color(${colorName}, gradientStart), sugar.color(${colorName}, gradientEnd), $angle: 90deg, $type: linear);`,
            `}`
        ].join('\n'));
    });
    cssArray.push([
        `/**`,
        ` * @name           s-bg:odd`,
        ` * @namespace      sugar.css.bg.classes`,
        ` * @type           CssClass`,
        ` * @platform       css`,
        ` * @status         beta`,
        ` *`,
        ` * This class allows you to scope the applied bgs on the direct childs to only be applied on "odd" HTMLElement`,
        ` *`,
        ` * @example        html`,
        ` * <ol class="s-bg\:odd">`,
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
        ` * @name           s-bg:even`,
        ` * @namespace      sugar.css.color`,
        ` * @type           CssClass`,
        ` * @platform       css`,
        ` * @status         beta`,
        ` *`,
        ` * This class allows you to scope the applied colors on the direct childs to only be applied on "even" HTMLElement`,
        ` *`,
        ` * @example        html`,
        ` * <ol class="s-bg\:even">`,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxPQUFPLE1BQU0sbUJBQW1CLENBQUM7QUFDeEMsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFHckQsTUFBTSx1Q0FBd0MsU0FBUSxZQUFZOztBQUN6RCxrREFBVSxHQUFHLEVBQUUsQ0FBQztBQUV6QixPQUFPLEVBQUUsdUNBQXVDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFaEU7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUU7SUFDdEQsTUFBTSxTQUFTLEdBQUcsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRTVDLE1BQU0sUUFBUSxHQUFhLEVBQUUsQ0FBQztJQUU5QixNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3RDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtRQUMzQixNQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFdEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLGNBQWMsRUFBRSxFQUFFO1lBRWhDLElBQUksY0FBYyxLQUFLLFNBQVM7Z0JBQUUsT0FBTztZQUV6QyxRQUFRLENBQUMsSUFBSSxDQUNQO2dCQUNFLEtBQUs7Z0JBQ0wsOEJBQThCLFNBQVMsS0FBSyxjQUFjLEVBQUU7Z0JBQzVELHNDQUFzQyxjQUFjLEVBQUU7Z0JBQ3RELDZCQUE2QjtnQkFDN0Isd0JBQXdCO2dCQUN4Qix5QkFBeUI7Z0JBQ3pCLElBQUk7Z0JBQ0osOERBQThELGNBQWMsVUFBVTtnQkFDdEYsSUFBSTtnQkFDSix5QkFBeUI7Z0JBQ3pCLDBCQUEwQixTQUFTLEtBQUssY0FBYyxJQUFJ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